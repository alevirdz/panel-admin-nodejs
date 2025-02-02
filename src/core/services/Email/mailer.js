const UserModel = require('../../model/UserAccountModel');
const RevokedTokenPassword = require('../../model/RevokedTokenPassword');
const { sendEmail } = require('../../../util/SendEmail');
const { encrypt, decrypt } = require('../../../util/EndToEndHashGenerator');
const { hashing } = require('../../../util/PasswordHasher');
const path = require('path');
const fs = require('fs/promises');
const { logError } = require('../../logs/LogsError.controller');

exports.sendRecoveryEmail = async (email) => {
    try {
        const user = await UserModel.findOne({ where: { email } });

        if (!user) {
            throw new Error('El usuario no existe');
        }

        const token = encrypt(user.id);
      await RevokedTokenPassword.create({
        token
       })
       

        const recoveryLink = `http://localhost:3000/reset-password?token=${token}`;

        //Podemos crear un controlador solo para pasarle parametros
        const templatePath = path.join(__dirname, 'Template', 'ResetPassword.html');
        const readTemplate = await fs.readFile(templatePath, 'utf-8');
        const personalizedHtml = readTemplate.replace('{{recoveryLink}}', recoveryLink);

        const emailResponse = await sendEmail(email, 'Recuperación de contraseña', personalizedHtml);
        return {
            message: emailResponse.message || 'Correo enviado exitosamente.',
            status: emailResponse.status || 200,
        };

    } catch (err) {
        const statusCode = err.status || 500;
        await logError('sendRecoveryEmail', err.message, statusCode, err.stack);
        throw {
            message: err.message || 'Ocurrió un error al enviar el correo',
            status: statusCode,
        };
    }
};

exports.resetPassword = async (token, newPassword) => {
    try {

        const {isRevoked} = await RevokedTokenPassword.findOne({
            attributes: ['isRevoked'],
            where: { token },
        });

        if (!isRevoked) {
            const decoded = decrypt(token);
            const hashedPassword = await hashing(newPassword);
            await UserModel.update({ password: hashedPassword }, { where: { id: decoded } });
            await RevokedTokenPassword.update({ isRevoked: true, revokedAt: new Date() }, { where: { token } });
            
        }else {
            throw new Error('Este token ha sido revocado');
        }

    } catch (err) {
        throw new Error(err);
    }
};

