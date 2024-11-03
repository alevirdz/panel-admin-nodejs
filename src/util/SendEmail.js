const nodemailer = require('nodemailer');
const { logError } = require('../core/logs/LogsError.controller');

const sendEmail = async (to, subject, htmlContent) => {
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
        html: htmlContent
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (err) {
        const statusCode = err.status || 500;
        await logError('sendEmail', err.message, statusCode, err.stack);
        return response.error(req, res, err.message || 'Ocurrió un error en el servidor', statusCode);
    }
};

module.exports = { sendEmail };
