const bcrypt = require('bcrypt');
const dotenv = require ('dotenv');
const jwt = require('jsonwebtoken');
const response = require('../red/responses');
const UserModel = require('../models/User.model');
dotenv.config();


exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return response.error(req, res, 'No se envió el campo: email o password', 400);
        }

        //Query
        const authenticatedUser = await UserModel.findOne({ where: { email } });
        if (!authenticatedUser) {
            return response.error(req, res, 'Usuario no encontrado', 404);
        }

        const isPasswordValid = await bcrypt.compare(password, authenticatedUser.password);
        if (!isPasswordValid) {
            return response.error(req, res, 'Contraseña incorrecta', 401);            
        }

        // Token JWT
        const token = jwt.sign(
            {   id: authenticatedUser.id, 
                firstName: authenticatedUser.firstName, 
                lastName: authenticatedUser.lastName, 
                email: authenticatedUser.email
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        );

        return response.success(req, res, { token: token }, 200);

    } catch (err) {
        //Recuerda manejar log de errores
        console.error('Error en startSesion:', err);
        return response.error(req, res, 'Ocurrio un problema en el servidor', 500);
    }
};

exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Verifica si se enviaron los campos necesarios
        if (!firstName || !lastName || !email || !password) {
            return response.error(req, res, 'Faltan campos requeridos: Los datos no estan completos', 400);   
        }

        // Verifica si el nombre de usuario ya existe
        const existingUser = await UserModel.findOne({ where: { email } });
        if (existingUser) {
            return response.error(req, res, 'El nombre de usuario ya está en uso', 409);   
        }

        // Hash de la contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Crea un nuevo usuario en la base de datos
        const newUser = await UserModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        // response exitosa
        response.success(req, res, 'Usuario creado exitosamente', 201);

    } catch (err) {
        console.error('Error en createUser:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};