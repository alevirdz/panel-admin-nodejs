
const UserModel = require('../model/UserAccountModel');
const Role = require('../model/RolesModel');
const { generateToken, tokenCreated, tokenUpdated } = require('../controllers/TokenController');
const { comparePassword } = require('../../util/PasswordHasher');
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

        if(authenticatedUser === null){
            throw new Error('El usuario no existe');
        }

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
        return response.success(req, res, { token }, 200);

    } catch (err) {
        const statusCode = err.status;
        await logError('signin', err.message, statusCode || 500, err.stack);
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
        const statusCode = err.status;
        await logError('logout', err.message, statusCode, err.stack);
        return response.error(req, res, err.message || 'Error al cerrar sesión en el metodo logout', statusCode);
    }
};