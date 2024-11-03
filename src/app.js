const express = require('express');
const dotenv = require ('dotenv');
const cors = require('cors');
const verifySesion = require('./core/middleware/authMiddleware');
const checkrol = require('./core/middleware/checkRol');
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
const recoveryPasswordRoutes = require('./routes/recoveryPassword.routes');

//Public
app.get('/info', (req, res) => {
    res.json({ message: 'Consulta información que puede ser publica, img, text' });
});
app.use('/api/reservation', reservationRoutes);


//Authentication
app.use('/api/auth', authRoutes);
app.use('/api/recover-password', recoveryPasswordRoutes);





//Middleware 
app.use('/api/usuario', verifySesion, userRoutes);
// app.use('/api/productos', verifySesion, checkrol('Master'), productRoutes);
app.use('/api/productos', verifySesion, productRoutes);
app.use('/api/gallery', verifySesion, galleryRoutes);
app.use('/auth/reservation', verifySesion, reservationRoutes);

module.exports = app;
