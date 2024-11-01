const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const response = require('../util/responses');
const UserModel = require('../models/User.model');
const RevokedToken = require('../models/RevokedToken.model');
const { logError } = require('../controllers/core/LogsError.controller');
dotenv.config();

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error('Campos incompletos');
        }

        const authenticatedUser = await UserModel.findOne({ where: { email } });
        if (!authenticatedUser) {
            throw new Error('El usuario no existe');
        }

        const isPasswordValid = await bcrypt.compare(password, authenticatedUser.password);
        if (!isPasswordValid) {
            throw new Error('Usuario o contraseña inválido');
        }

        //Puede ser una herramienta de generador de token
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
            throw new Error('Ocurrio un problema en revocar el token');
        });

    } catch (err) {
        const statusCode = err.status || 500;
        await logError('signin', err.message, statusCode, err.stack);
        return response.error(req, res, err.message || 'Ocurrió un error en el servidor', statusCode);
    }
};

exports.logout = async (req, res) => {

    const token = req.headers['authorization']?.split(' ')[1];
    try {

        if (!token) {
            throw new Error('Token no proporcionado');
        }

        await RevokedToken.update(
            { revoked: true, revokedAt: new Date() },
            { where: { token: token } }
        );

        return response.success(req, res, 'OK', 200);
    } catch (err) {
        const statusCode = err.status || 500;
        await logError('logout', err.message, statusCode, err.stack);
        return response.error(req, res, err.message || 'Error al cerrar sesión en el metodo logout', statusCode);
    }
};

exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            throw new Error('Los datos no estan completos');
        }

        const existingUser = await UserModel.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('El nombre de usuario ya está en uso');
        }

        // Hash puede ser una herramienta
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await UserModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
        return response.success(req, res, 'Usuario creado exitosamente', 201);

    } catch (err) {
        const statusCode = err.status || 500;
        await logError('register', err.message, statusCode, err.stack);
        return response.error(req, res, err.message || 'Ocurrio un error al intentar crear al usuario', statusCode);
    }
};