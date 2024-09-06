const { Sequelize } = require('sequelize');
const dotenv = require ('dotenv');
dotenv.config();

console.log(process.env.PWD)
const connection = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PWD, {
  host: process.env.HOST,
  dialect:  process.env.MOTOR,
  port: process.env.DB_PORT,
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