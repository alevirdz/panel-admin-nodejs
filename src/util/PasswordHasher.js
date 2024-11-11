const bcrypt = require('bcrypt');

const hashing = async (data, saltRounds = 10) => {
    try {
        const hashedString = await bcrypt.hash(data, saltRounds);
        return hashedString;
    } catch (err) {
        throw new Error('Error en la encriptación');
    }
};

const comparePassword = async (password, hashedString) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedString);
        return isMatch;
    } catch (err) {
        throw new Error('Error al comparar contraseñas');
    }
};

module.exports = { hashing, comparePassword };
