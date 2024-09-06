const { Sequelize } = require('sequelize');
const dotenv = require ('dotenv');
dotenv.config();


const connection = new Sequelize('app', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: '3306',
  logging: false
});

(async () => {
  try {
    await connection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = connection;