const mysql = require('mysql2');
const config = require('../config');

// Configura la conexión a la base de datos
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PWD,
    database: process.env.DATABASE
  });
  
  // Conecta a la base de datos
  connection.connect((err) => {
    if (err) {
      console.error('Error conectando a la base de datos:', err.stack);
      return;
    }
    console.log('Conexión a la base de datos establecida');
  });
  
  module.exports = connection;