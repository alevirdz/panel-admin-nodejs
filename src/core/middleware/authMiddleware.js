const Token = require('../model/UserTokenModel');
const { decodeToken } = require('../controllers/TokenController');
const response = require('../../util/responses');
const { logError } = require('../logs/LogsError.controller');

const verifySesion = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return response.success(req, res, 'Token no proporcionado', 401);
    }

    try {

        const isRevokedToken = await Token.findOne({ where: { token, revoked: true } });
        if (isRevokedToken) {
            return response.success(req, res, 'Token caducado', 401);
        }

        const decoded = decodeToken(token);
        req.user = decoded;
        next();

    } catch (err) {
        const statusCode = err.status || 500;
        await logError('verifySesion', err.message, statusCode, err.stack);
        return response.error(req, res, err.message || 'Ocurrió un error en el servidor', statusCode);
    }
};


module.exports = verifySesion;
