const PasswordRecoveryService = require('../services/Email/mailer');
const UserModel = require('../model/UserAccountModel');
const { decodeToken } = require('../controllers/TokenController');
const response = require('../../util/responses');
const { hashing, comparePassword } = require('../../util/PasswordHasher');
const { logError } = require('../logs/LogsError.controller');

exports.generateRecoveryLink = async (req, res) => {
    const { email } = req.body;
    try {
        const result = await PasswordRecoveryService.sendRecoveryEmail(email);
        return response.success(req, res, result.message, 200);
    } catch (err) {
        const statusCode = err.status || 500;
        await logError('generateRecoveryLink', err.message, statusCode, err.stack);
        return response.error(req, res, err.message || 'Ocurrió un error al procesar la solicitud', statusCode);
    }
};

exports.resetPasswordByLink = async (req, res) => {
    const { token, resetPassword } = req.body;

    try {
        await PasswordRecoveryService.resetPassword(token, resetPassword);
        return response.success(req, res, 'Contraseña restablecida con éxito', 200);
    } catch (err) {
        const statusCode = err.status || 500;
        await logError('resetPasswordByLink', err.message, statusCode, err.stack);
        return response.error(req, res, err.message || 'Ocurrió un error en el servidor', statusCode);
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { token, oldPassword, newPassword } = req.body;

        const decoded = decodeToken(token);
        const userID = decoded.id

        const authenticatedUser = await UserModel.findOne({
            where: { id: userID },
        });
    
        const isPasswordValid = await comparePassword(oldPassword, authenticatedUser.password);
            if (!isPasswordValid) {
                throw new Error('La contraseña del usuario no coincide');
            };
        
        const hashedNewPassword = await hashing(newPassword);

        await UserModel.update(
            { password: hashedNewPassword },
            { where: { id: userID } }
        )
        return response.success(req, res, 'Contraseña restablecida con éxito', 200);

    } catch (err) {
        const statusCode = err.status || 500;
        await logError('resetPassword', err.message, statusCode, err.stack);
        return response.error(req, res, err.message || 'Ocurrió un error en el servidor', statusCode);
    }
};
