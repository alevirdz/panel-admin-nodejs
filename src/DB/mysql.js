const { Sequelize } = require('sequelize');
const dotenv = require ('dotenv');
dotenv.config();

const connection = new Sequelize("app", "root", "root_", {
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