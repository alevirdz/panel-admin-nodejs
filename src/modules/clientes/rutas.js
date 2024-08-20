const express = require('express');
const respuesta = require('../../red/respuestas');


const db = require ('../../DB/mysql');

const router = express.Router();

// Define una ruta que maneja la consulta a la base de datos
router.get('/', (req, res) => {
    // Ejecuta una consulta
    db.query('SELECT * FROM Users', (err, results) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err.stack);
            respuesta.error(req, res, 'Error al ejecutar la consulta', 500);
            return;
        }
        console.log('Resultados de la consulta:', results);
        respuesta.success(req, res, results, 200);
    });
});

module.exports = router;
  

//const router = express.Router();

//router.get('/', (req, res)=>{
    //respuesta.success(req, res, 'Todo bien', 200)
//});

//module.exports = router;