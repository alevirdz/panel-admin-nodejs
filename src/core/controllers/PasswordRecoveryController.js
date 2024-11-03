const PasswordRecoveryService = require('../services/Email/mailer');
const response = require('../../util/responses');
const { logError } = require('../logs/LogsError.controller');

exports.generateRecoveryLink = async (req, res) => {
    const { email } = req.body;
    try {
        await PasswordRecoveryService.sendRecoveryEmail(email);
        return res.status(200).json({ message: 'Email de recuperación enviado' });
    } catch (err) {
        const statusCode = err.status || 500;
        await logError('generateRecoveryLink', err.message, statusCode, err.stack);
        return response.error(req, res, err.message || 'Ocurrió un error en el servidor', statusCode);
    }
};

exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    
    try {
        await PasswordRecoveryService.resetPassword(token, newPassword);
        return res.status(200).json({ message: 'Contraseña restablecida con éxito' });
    } catch (err) {
        const statusCode = err.status || 500;
        await logError('resetPassword', err.message, statusCode, err.stack);
        return response.error(req, res, err.message || 'Ocurrió un error en el servidor', statusCode);
    }
};
