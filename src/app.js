const express = require('express');
const dotenv = require ('dotenv');
const cors = require('cors');
const verifyToken = require('./middlewares/authMiddleware');
const checkrol = require('./middlewares/checkRol');
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
const userAuth = require('./routes/auth.routes')
const userController = require('./routes/user.routes');
const productController = require('./routes/product.routes');
const galleryController = require('./routes/gallery.routes');
const reservationController = require('./routes/resevation.routes');


// Without Auth
app.get('/info', (req, res) => {
    res.json({ message: 'Consulta información que puede ser publica, img, text' });
});
app.use('/api/reservation', reservationController);


//Authentication
app.use('/api/auth', userAuth);




//Middleware 
app.use('/api/usuario', verifyToken, userController);
// app.use('/api/productos', verifyToken, checkrol('Master'), productController);
app.use('/api/productos', verifyToken, productController);
app.use('/api/gallery', verifyToken, galleryController);
app.use('/auth/reservation', verifyToken, reservationController);

module.exports = app;
