const UserModel = require('../../model/UserCreateAccountModel');
const { sendEmail } = require('../../../util/SendEmail');
const { generateToken, verifyToken } = require('../../controllers/TokenController');
const { hashing } = require('../../../util/Hashing');
const path = require('path');
const fs = require('fs/promises');

exports.sendRecoveryEmail = async (email) => {
    try {
        const user = await UserModel.findOne({ where: { email } });

        if (!user) {
            throw new Error('El usuario no existe');
        }

        const token = generateToken({ id: user.id }, process.env.JWT_EXPIRATION_RECOVERY_PASSWORD);
        const recoveryLink = `http://localhost:4000/api/recover-password/reset-password?token=${token}`;

        //Podemos crear un controlador solo para pasarle parametros
        const templatePath = path.join(__dirname, 'Template', 'ResetPassword.html');
        const readTemplate = await fs.readFile(templatePath, 'utf-8');
        const personalizedHtml = readTemplate.replace('{{recoveryLink}}', recoveryLink);

        await sendEmail(email, 'Recuperación de contraseña', personalizedHtml); 

    } catch (err) {
        throw new Error(err);
    }
};

exports.resetPassword = async (token, newPassword) => {
   try {
        const decoded = verifyToken(token);
        const hashedPassword = await hashing(newPassword);
        await UserModel.update({ password: hashedPassword }, { where: { id: decoded.id } });
   } catch (err) {
    console.log(err)
        throw new Error(err);
   }
};
