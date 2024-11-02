const UserModel = require('../../core/model/UserCreateAccountModel');
const { sendEmail } = require('../../util/SendEmail');
const { generateToken } = require('../../core/controllers/TokenController');
const bcrypt = require('bcrypt');

exports.sendRecoveryEmail = async (email) => {
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
        throw new Error('El usuario no existe');
    }

    const token = generateToken({ id: user.id });
    const recoveryLink = `http://tu-sitio.com/reset-password?token=${token}`;
    
    await sendEmail(email, 'Recuperación de contraseña', `Haz clic en el siguiente enlace para restablecer tu contraseña: ${recoveryLink}`);
};

exports.resetPassword = async (token, newPassword) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await UserModel.update({ password: hashedPassword }, { where: { id: decoded.id } });
};
