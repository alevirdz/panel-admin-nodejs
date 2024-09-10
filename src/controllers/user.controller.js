const bcrypt = require('bcrypt');
const dotenv = require ('dotenv');
const jwt = require('jsonwebtoken');
const response = require('../red/responses');
const Usuario = require('../models/User.model');
dotenv.config();

exports.getUser = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return response.error(req, res, 'No se envió el campo: ID', 400);
        }

        // Buscar el usuario en la base de datos
        const usuario = await Usuario.findOne({ where: { id } });
        if (!usuario) {
            return response.error(req, res, 'Usuario no encontrado', 404);
        }

        const { password: _, ...userWithoutPassword } = usuario.toJSON();
        response.success(req, res, { user: userWithoutPassword }, 200);

    } catch (err) {
        console.error('Error en startSesion:', err);
        return response.error(req, res, 'Ocurrio un problema en el servidor', 500);
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id, firstName, lastName, password } = req.body;

        // Verifica si se enviaron los campos necesarios
        if (!id || (!firstName && !lastName && password)) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        // Busca al usuario en la base de datos usando el id
        const usuario = await Usuario.findByPk(id);

        // Verifica si el usuario existe
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Hash de la contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Prepara los campos a actualizar
        const updateFields = {};
        if (firstName) updateFields.firstName = firstName;
        if (lastName) updateFields.lastName = lastName;
        if (hashedPassword) updateFields.password = hashedPassword;

        // Actualiza el usuario en la base de datos
        await Usuario.update(updateFields, { where: { id } });

        // response exitosa
        response.success(req, res, 'Datos del usuario actualizados exitosamente', 200);

    } catch (err) {
        console.error('Error en userUpdate:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id} = req.body;

        if (!id) {
            return response.error(req, res, 'No se envió el parámetro: ID', 400);
        }

        // Buscar el usuario en la base de datos
        const usuario = await Usuario.findOne({ where: { id } });
        if (!usuario) {
            return response.error(req, res, 'Usuario no encontrado', 404);
        }

        // Eliminar el usuario
        await Usuario.destroy({ where: { id } });

        response.success(req, res, { message: 'Usuario eliminado con éxito' }, 200);

    } catch (err) {
        console.error('Error en deleteUser:', err);
        return response.error(req, res, 'Ocurrió un problema en el servidor', 500);
    }
};