const bcrypt = require('bcrypt');
const Usuario = require('../model/UserAccountModel');
const response = require('../../util/responses');
const { logError } = require('../logs/LogsError.controller');

exports.userAccountById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw new Error('No se envió el campo: ID');
        }

        const usuario = await Usuario.findOne({ 
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

exports.updateUser = async (req, res) => {
    try {
        const { id, firstName, lastName } = req.body;

        if (!id || (!firstName && !lastName)) {
            throw new Error('Faltan campos requeridos');
        }

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        const updateFields = {};
        if (firstName) updateFields.firstName = firstName;
        if (lastName) updateFields.lastName = lastName;

        await Usuario.update(updateFields, { where: { id } });

        response.success(req, res, 'Datos del usuario actualizados exitosamente', 200);

    } catch (err) {
        const statusCode = err.status || 500;
        await logError('updateUser', err.message, statusCode, err.stack);
        return response.error(req, res, err.message || 'Ocurrió un error en el servidor', statusCode);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id} = req.body;

        if (!id) {
            throw new Error('No se envió el parámetro: ID');
        }

        const usuario = await Usuario.findOne({ where: { id } });
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        await Usuario.destroy({ where: { id } });
        
        response.success(req, res, 'Usuario eliminado con éxito', 200);

    } catch (err) {
        const statusCode = err.status || 500;
        await logError('updateUser', err.message, statusCode, err.stack);
        return response.error(req, res, err.message || 'Ocurrió un error en el servidor', statusCode);
    }
};

exports.allAccounts = async (req, res) => {
    try {
        const accounts = await Usuario.findAll({
            attributes: {exclude: ['password']}
        });
        return response.success(req, res, {accounts: accounts}, 200);
    } catch (err) {
        const statusCode = err.status || 500;
        await logError('allAccounts', err.message, statusCode, err.stack);
        return response.error(req, res, err.message || 'Ocurrió un error en el servidor', statusCode);
    }
};