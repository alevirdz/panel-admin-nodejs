const nodemailer = require('nodemailer');
const { logError } = require('../core/logs/LogsError.controller');

const sendEmail = async (to, subject, htmlContent) => {

    return new Promise(async (resolve, reject) => {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: process.env.EMAIL_SECURE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            html: htmlContent,
        };

        try {

            await transporter.sendMail(mailOptions);
            resolve({
                message: 'Correo enviado exitosamente.',
                status: 200
            });

        } catch (err) {

            let errorMessage;

            switch (err.responseCode) {
                case 550:
                    errorMessage = 'El correo electrónico no existe o ha sido rechazado.';
                    break;
                case 421:
                    errorMessage = 'El servidor está temporalmente sobrecargado. Por favor, intenta más tarde.';
                    break;
                case 450:
                    errorMessage = 'El buzón de correo está temporalmente no disponible. Por favor, intenta más tarde.';
                    break;
                case 554:
                    errorMessage = 'El mensaje ha sido rechazado por el servidor (posible contenido de spam).';
                    break;
                case 530:
                    errorMessage = 'Se requiere autenticación para enviar el correo.';
                    break;
                default:
                    errorMessage = err.message || 'Ocurrió un error desconocido al enviar el correo.';
            }
            // await logError('sendEmail', err.errorMessage, responseCode, err.stack);
            reject({
                message: errorMessage,
                status: err.responseCode || 500,
            });
        }
    });
};

module.exports = { sendEmail };
