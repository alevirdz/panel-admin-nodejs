const express = require('express');
const dotenv = require ('dotenv');
const cors = require('cors');
const verifyToken = require('./core/middleware/authMiddleware');
const checkrol = require('./core/middleware/checkRol');
const PasswordRecoveryController = require('./core/controllers/PasswordRecoveryController');
dotenv.config();


const app = express();
app.set('port', process.env.PORT);
app.use(express.json());
app.use(cors({
  origin: process.env.ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

//Callback Controllers
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const galleryRoutes = require('./routes/gallery.routes');
const reservationRoutes = require('./routes/reservation.routes');

// Without Auth
app.get('/info', (req, res) => {
    res.json({ message: 'Consulta información que puede ser publica, img, text' });
});
app.use('/api/reservation', reservationRoutes);


//Authentication
app.use('/api/auth', authRoutes);
app.use('/api/recover-password', authRoutes);





//Middleware 
app.use('/api/usuario', verifyToken, userRoutes);
// app.use('/api/productos', verifyToken, checkrol('Master'), productRoutes);
app.use('/api/productos', verifyToken, productRoutes);
app.use('/api/gallery', verifyToken, galleryRoutes);
app.use('/auth/reservation', verifyToken, reservationRoutes);

module.exports = app;
