const bcrypt = require('bcrypt');
const dotenv = require ('dotenv');
const jwt = require('jsonwebtoken');
const respuesta = require('../red/respuestas');
const Usuario = require('../models/User.model');
dotenv.config();


exports.auth = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return respuesta.error(req, res, 'No se envió el campo: email o password', 400);
        }

        // Buscar el usuario en la base de datos
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return respuesta.error(req, res, 'Usuario no encontrado', 404);
        }

        const isPasswordValid = await bcrypt.compare(password, usuario.password);
        if (!isPasswordValid) {
            return respuesta.error(req, res, 'Contraseña incorrecta', 401);            
        }

        // Generar el token JWT
        const token = jwt.sign(
            { id: usuario.id, firstName: usuario.firstName, lastName: usuario.lastName, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        );

        respuesta.success(req, res, { token }, 200);

    } catch (err) {
        console.error('Error en startSesion:', err);
        return respuesta.error(req, res, 'Ocurrio un problema en el servidor', 500);
    }
};

exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Verifica si se enviaron los campos necesarios
        if (!firstName || !lastName || !email || !password) {
            return respuesta.error(req, res, 'Faltan campos requeridos: Los datos no estan completos', 400);   
        }

        // Verifica si el nombre de usuario ya existe
        const existingUser = await Usuario.findOne({ where: { email } });
        if (existingUser) {
            return respuesta.error(req, res, 'El nombre de usuario ya está en uso', 409);   
        }

        // Hash de la contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Crea un nuevo usuario en la base de datos
        const newUser = await Usuario.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        // Respuesta exitosa
        respuesta.success(req, res, 'Usuario creado exitosamente', 201);

    } catch (err) {
        console.error('Error en createUser:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};