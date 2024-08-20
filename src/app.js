// app.js
const express = require('express');
const config = require('./config.js');


const clientes = require('./modules/clientes/rutas.js')

const app = express();

// Configura middleware
//app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Configura rutas
app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

app.use('/api/clientes', clientes)

// Configura el puerto en la aplicación Express
app.set('port', config.app.port);

module.exports = app;
