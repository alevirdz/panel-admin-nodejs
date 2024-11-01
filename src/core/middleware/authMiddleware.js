const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const RevokedToken = require('../model/UserTokenModel');

dotenv.config();

const verifyToken = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    try {
        const revokedToken = await RevokedToken.findOne({ where: { token, revoked: true } });
        if (revokedToken) {
            return res.status(401).json({ message: 'Token caducado' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Error en la verificación del token:', err);
        return res.status(401).json({ message: 'Token inválido' });
    }
};


module.exports = verifyToken;
