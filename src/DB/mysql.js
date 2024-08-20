const mysql = require('mysql2');
const dotenv = require ('dotenv');
dotenv.config();

// Configura la conexión a la base de datos
// const connection = mysql.createConnection({
//   host: process.env.HOST,
//   port: process.env.DB_PORT,
//   user: process.env.USER,
//   password: process.env.PWD,
//   database: process.env.DATABASE
// });

const connection = mysql.createConnection({
  host: '192.168.20.199',
  port: '3307',
  user: 'alevi',
  password: 'alevi123',
  database: 'aplication_web'
});

  // Conecta a la base de datos
  connection.connect((err) => {
    if (err) {
      console.error('Error conectando a la base de datos ___ :', err);
      return;
    }
    console.log('Conexión a la base de datos establecida');
  });
  
  
  module.exports = connection;