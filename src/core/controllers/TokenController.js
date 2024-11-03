const jwt = require('jsonwebtoken');
const Token = require('../model/UserTokenModel');


const generateToken = (payload, expiresIn = process.env.JWT_EXPIRATION) => {
    console.log(expiresIn)
    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn:  expiresIn}
    );

    return token;
};

const tokenCreated = async (userId, token) => {
    try {
        await Token.create({
            user_id: userId,
            token,
            revoked: false,
            createdAt: new Date()
        });
    } catch (err) {
        throw new Error('Ocurrió un problema al crear el token');
    }
};

const tokenUpdated = async (token) => {
    try {
        await Token.update(
            { revoked: true, revokedAt: new Date() },
            { where: { token } }
        );
    } catch (err) {
        throw new Error('Ocurrió un problema al actualizar el estado del token');
    }
};

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (err) {
        throw new Error('Token inválido o expirado');
    }
};

module.exports = { generateToken, tokenCreated, tokenUpdated, verifyToken };