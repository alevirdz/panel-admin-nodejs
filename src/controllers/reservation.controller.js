const response = require('../util/responses');
const Reservation = require('../models/Reservation.model');
const CustomerBooker = require('../models/CustomerBooker.model');



exports.index = (req, res) => {
    try {
        response.success(req, res, 'Bienvenido al index', 200);
    } catch (err) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.getReservationById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return response.error(req, res, 'No se proporcionó el campo: ID', 400);
        }

        const reservation = await Reservation.findByPk(id);

        if (!reservation) {
            return response.error(req, res, 'reservación no encontrado', 404);
        }

        response.success(req, res, { reservation }, 200);

    } catch (err) {
        console.error('Error en getProductById:', err);
        return response.error(req, res, 'Ocurrió un problema en el servidor', 500);
    }
};

exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.findAll({
            include: [{
                model: CustomerBooker,
                as: 'customer'
            }]
        });
        res.status(200).json(reservations);
    } catch (err) {
        console.error('Error en getAllReservations:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.addReservation = async (req, res) => {
    try {
        const { customer, reservation } = req.body;
        const { name, email, phone } = customer;
        const { check_in_date, check_out_date, number_of_guests, special_requests, status } = reservation;

        const requiredCustomerFields = ['name', 'email', 'phone'];
        const requiredReservationFields = ['check_in_date', 'check_out_date', 'number_of_guests'];

        const missingCustomerFields = requiredCustomerFields.filter(field => !customer[field]);
        const missingReservationFields = requiredReservationFields.filter(field => !reservation[field]);
        const missingFields = [...missingCustomerFields, ...missingReservationFields];

        if (missingFields.length > 0) {
            const errorMessage = `Faltan campos requeridos: ${missingFields.join(', ')}`;
            return res.status(400).json({ message: errorMessage });
        }

        // Verifica si el cliente con el email proporcionado existe en la tabla `customers_booker`
        let customerRecord = await CustomerBooker.findOne({ where: { email: email } });

        if (!customerRecord) {
            customerRecord = await CustomerBooker.create({
                email: email,
                name: name,
                phone: phone
            });
        }

        const existingReservation = await Reservation.findOne({
            where: {
                customer_email: email,
                check_in_date: check_in_date,
                check_out_date: check_out_date
            }
        });

        if (existingReservation) {
            return res.status(400).json({ message: 'Ya existe una reserva para estas fechas y este cliente.' });
        }

        const newReservation = await Reservation.create({
            customer_email: email,
            check_in_date,
            check_out_date,
            number_of_guests,
            special_requests,
            status: status || 'Pending'
        });

        // Respuesta exitosa
        res.status(201).json({ message: 'Reserva creada exitosamente', reservation: newReservation });

    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ message: 'Ya existe una reserva para estas fechas y este cliente.' });
        } else {
            console.error('Error en addReservation:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
};





exports.updateReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const { check_in_date, check_out_date, number_of_guests, special_requests, status } = req.body;

        // Verifica si la reserva existe
        const reservation = await Reservation.findByPk(id);
        if (!reservation) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }

        // Actualiza la reserva
        const updatedReservation = await reservation.update({
            check_in_date,
            check_out_date,
            number_of_guests,
            special_requests,
            status: status || reservation.status // Mantiene el estado actual si no se proporciona uno nuevo
        });

        res.status(200).json({ message: 'Reserva actualizada exitosamente', reservation: updatedReservation });
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ message: 'Ya existe una reserva para estas fechas y este cliente.' });
        } else {
            console.error('Error en updateReservation:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
};

exports.deleteReservation = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Verifica si la reserva existe
        const reservation = await Reservation.findByPk(id);
        if (!reservation) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }

        // Elimina la reserva
        await reservation.destroy();
        res.status(200).json({ message: 'Reserva eliminada exitosamente' });
    } catch (err) {
        console.error('Error en deleteReservation:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
