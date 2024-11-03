
const UserModel = require('../model/UserAccountModel');
const Role = require('../model/RolesModel');
const { generateToken, tokenCreated, tokenUpdated } = require('../controllers/TokenController');
const { hashing, comparePassword } = require('../../util/Hashing');
const response = require('../../util/responses');
const { logError } = require('../logs/LogsError.controller');

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error('Campos incompletos');
        }

        const authenticatedUser = await UserModel.findOne({
            where: { email },
            include: [{
                model: Role,
                through: {
                    attributes: [],
                },
            }],
        });

        const isPasswordValid = await comparePassword(password, authenticatedUser.password);
        if (!isPasswordValid) {
            throw new Error('Usuario o contraseña inválido');
        };

        const payload = {
            id: authenticatedUser.id,
            name: authenticatedUser.firstName,
            lastName: authenticatedUser.lastName,
            email: authenticatedUser.email,
            role: authenticatedUser.Roles[0]?.name
        };

        const token = generateToken(payload);

        await tokenCreated(authenticatedUser.id, token);
        return response.success(req, res, { token: token }, 200);

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

        await tokenUpdated(token);

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

        const hashedPassword = await hashing(password);

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