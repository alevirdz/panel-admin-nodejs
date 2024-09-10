const express = require('express');
const config = require('./config.js');
const verifyToken = require('./middlewares/authMiddleware');
const checkrol = require('./middlewares/checkPermissions');
const app = express();

app.set('port', config.app.port);
app.use(express.json());

//Callback Controllers
const userAuth = require('./routes/auth.routes')
const userController = require('./routes/user.routes');
const productController = require('./routes/product.routes');

// Without Auth
app.get('/info', (req, res) => {
    res.json({ message: 'Consulta información que puede ser publica, img, text' });
});


//Authentication
app.use('/api/auth', userAuth);




//Middleware 
app.use('/api/usuario', verifyToken, userController);
// app.use('/api/productos', verifyToken, checkrol('Master'), productController);
app.use('/api/productos', verifyToken, checkrol(['Master', 'Admin']), productController);

module.exports = app;
