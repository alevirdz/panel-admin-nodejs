const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const response = require('../HTTP/responses');
const UserModel = require('../models/User.model');
const RevokedToken = require('../models/RevokedToken.model');
dotenv.config();


exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return response.error(req, res, 'Campos incompletos', 400);
        }

        const authenticatedUser = await UserModel.findOne({ where: { email } });
        if (!authenticatedUser) {
            return response.error(req, res, 'El usuario no existe', 404);
        }

        const isPasswordValid = await bcrypt.compare(password, authenticatedUser.password);
        if (!isPasswordValid) {
            return response.error(req, res, 'Usuario o contraseña invalido', 401);
        }


        const token = jwt.sign(
            {
                id: authenticatedUser.id,
                firstName: authenticatedUser.firstName,
                lastName: authenticatedUser.lastName,
                email: authenticatedUser.email
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        );

        await RevokedToken.create({
            user_id: authenticatedUser.id,
            token: token,
            revoked: false,
            createdAt: new Date()
        }).then(() => {
            return response.success(req, res, { token: token }, 200);
        }).catch(err => {
            console.error('Error al guardar el token:', err.message);
            return response.error(req, res, 'Ocurrio al iniciar sesión', 500);
        });
        
    } catch (err) {
        return response.error(req, res, 'Ocurrio un error en el servidor en el metodo signin', 500);
    }
};

// Cierre de sesión
exports.logout = async (req, res) => {
  
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return response.error(req, res, 'Token no proporcionado', 403);
    }

    try {
        await RevokedToken.update(
            { revoked: true, revokedAt: new Date() },
            { where: { token: token } }
        );

        return response.success(req, res, 'OK', 200);
    } catch (err) {
        return response.error(req, res, 'Error al cerrar sesión en el metodo logout', 500);
    }
};




exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return response.error(req, res, 'Los datos no estan completos', 400);
        }

        const existingUser = await UserModel.findOne({ where: { email } });
        if (existingUser) {
            return response.error(req, res, 'El nombre de usuario ya está en uso', 409);
        }

        // Hash
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await UserModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        response.success(req, res, 'Usuario creado exitosamente', 201);

    } catch (err) {
        console.error('Error en createUser:', err);
        res.status(500).json({ message: 'Error interno del servidor del metodo register' });
    }
};