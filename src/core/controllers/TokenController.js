const jwt = require('jsonwebtoken');
const Token = require('../model/UserTokenModel');
// const dotenv = require ('dotenv');
// dotenv.config();

const generateToken = (payload) => {
    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION }
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

module.exports = { generateToken, tokenCreated, tokenUpdated };