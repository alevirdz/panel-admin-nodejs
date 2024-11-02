const PasswordRecoveryService = require('../../services/email/mailer');

exports.requestPasswordRecovery = async (req, res) => {
    const { email } = req.body;
    try {
        await PasswordRecoveryService.sendRecoveryEmail(email);
        return res.status(200).json({ message: 'Email de recuperación enviado' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        await PasswordRecoveryService.resetPassword(token, newPassword);
        return res.status(200).json({ message: 'Contraseña restablecida con éxito' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
