const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation.controller');
const verifyToken = require('../core/middleware/authMiddleware');

router.post('/', reservationController.index);

//To CRUD
router.get('/id/:id', reservationController.getReservationById);
router.get('/getAll', reservationController.getAllReservations);
router.post('/add', reservationController.addReservation);
router.put('/update/:id', verifyToken, reservationController.updateReservation);
router.delete('/delete/:id', verifyToken, reservationController.deleteReservation);

module.exports = router;