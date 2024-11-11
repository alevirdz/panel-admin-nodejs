const UserModel = require('../model/UserAccountModel');
const response = require('../../util/responses');
const { hashing } = require('../../util/PasswordHasher');
const { logError } = require('../logs/LogsError.controller');

exports.createAccountUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            throw new Error('Los datos no estan completos');
        }

        const existingUser = await UserModel.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('El nombre de usuario ya está en uso');
        }

        const hashedPassword = await hashing(password);

        await UserModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        return response.success(req, res, 'Usuario creado exitosamente', 201);

    } catch (err) {
        const statusCode = err.status || 500;
        await logError('createAccountUser', err.message, statusCode, err.stack);
        return response.error(req, res, err.message || 'Ocurrio un error al intentar crear al usuario', statusCode);
    }
};

exports.userAccountById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw new Error('No se envió el campo: ID');
        }

        const usuario = await UserModel.findOne({ 
            where: { id }, 
            attributes: {exclude: ['password']}
        });

        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        response.success(req, res, { profile: usuario }, 200);

    } catch (err) {
        const statusCode = err.status || 500;
        await logError('userAccountById', err.message, statusCode, err.stack);
        return response.error(req, res, err.message || 'Ocurrió un error en el servidor', statusCode);
    }
};

exports.updateAccountUser = async (req, res) => {
    try {
        const { id, firstName, lastName } = req.body;

        if (!id || (!firstName && !lastName)) {
            throw new Error('Faltan campos requeridos');
        }

        const usuario = await UserModel.findByPk(id);

        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        const updateFields = {};
        if (firstName) updateFields.firstName = firstName;
        if (lastName) updateFields.lastName = lastName;

        await UserModel.update(updateFields, { where: { id } });

        response.success(req, res, 'Datos del usuario actualizados exitosamente', 200);

    } catch (err) {
        const statusCode = err.status || 500;
        await logError('updateAccountUser', err.message, statusCode, err.stack);
        return response.error(req, res, err.message || 'Ocurrió un error en el servidor', statusCode);
    }
};

exports.deleteAccountUser = async (req, res) => {
    try {
        const { id} = req.body;

        if (!id) {
            throw new Error('No se envió el parámetro: ID');
        }

        const usuario = await UserModel.findOne({ where: { id } });
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        await UserModel.destroy({ where: { id } });

        response.success(req, res, 'Usuario eliminado con éxito', 200);

    } catch (err) {
        const statusCode = err.status || 500;
        await logError('deleteAccountUser', err.message, statusCode, err.stack);
        return response.error(req, res, err.message || 'Ocurrió un error en el servidor', statusCode);
    }
};

exports.allAccounts = async (req, res) => {
    try {
        const accounts = await UserModel.findAll({
            attributes: {exclude: ['password']}
        });
        return response.success(req, res, {accounts: accounts}, 200);
    } catch (err) {
        const statusCode = err.status || 500;
        await logError('allAccounts', err.message, statusCode, err.stack);
        return response.error(req, res, err.message || 'Ocurrió un error en el servidor', statusCode);
    }
};