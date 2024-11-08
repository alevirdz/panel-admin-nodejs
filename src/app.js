const express = require('express');
const dotenv = require ('dotenv');
const cors = require('cors');
const verifySesion = require('./core/middleware/authMiddleware');
const checkrol = require('./core/middleware/checkRol');
dotenv.config();


const app = express();
app.set('port', process.env.PORT);
console.log(process.env.ORIGIN, 'origin');
app.use(express.json());
app.use(cors({
  origin: process.env.ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

//Callback System Controllers
const userAuthAccountRoutes = require('./routes/Secure/UserAuthAccount.routes');
const userAccountRoutes = require('./routes/Secure/UserAccount.routes');
const userRecoveryPasswordRoutes = require('./routes/Secure/UserRecoveryPassword.routes');
//Callback Controllers
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const galleryRoutes = require('./routes/gallery.routes');
const reservationRoutes = require('./routes/reservation.routes');

//Public Middleware
app.get('/info', (req, res) => { res.json({ message: 'Consulta información que puede ser publica, img, text' }); });
app.use('/api/reservation', reservationRoutes);

//Authentication Middleware
app.use('/api/auth', userAuthAccountRoutes);
app.use('/api/recover-password', userRecoveryPasswordRoutes);

//App Middleware
app.use('/api/account', verifySesion, userAccountRoutes);
app.use('/api/usuario', verifySesion, userRoutes);
// app.use('/api/productos', verifySesion, checkrol('Master'), productRoutes);
app.use('/api/productos', verifySesion, productRoutes);
app.use('/api/gallery', verifySesion, galleryRoutes);
app.use('/auth/reservation', verifySesion, reservationRoutes);

module.exports = app;
