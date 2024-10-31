// const jwt = require('jsonwebtoken');
// const dotenv = require ('dotenv');
// dotenv.config();

// const verifyToken = (req, res, next) => {
//     const token = req.headers['authorization']?.split(' ')[1]; // Asume que el token se pasa en el formato "Bearer token"

//     if (!token) {
//         return res.status(403).json({ message: 'Token no proporcionado' });
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ message: 'Token inválido' });
//         }

//         req.user = decoded; // Puedes almacenar información decodificada del usuario en req.user
//         next();
//     });
// };

// module.exports = verifyToken;

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const RevokedToken = require('../models/RevokedToken.model');

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
