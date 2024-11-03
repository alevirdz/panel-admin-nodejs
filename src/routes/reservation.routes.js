const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation.controller');
const verifySesion = require('../core/middleware/authMiddleware');

router.post('/', reservationController.index);

//To CRUD
router.get('/id/:id', reservationController.getReservationById);
router.get('/getAll', reservationController.getAllReservations);
router.post('/add', reservationController.addReservation);
router.put('/update/:id', verifySesion, reservationController.updateReservation);
router.delete('/delete/:id', verifySesion, reservationController.deleteReservation);

module.exports = router;