// const mysql = require('mysql2/promise');
const connection = require('./connection/mysql');
const bcrypt = require('bcryptjs');


// Función para guardar un nuevo usuario
async function saveUser(username, email, password) {
  try {
    // Verificar si el usuario o el correo ya existen
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email]);
    if (rows.length > 0) {
      throw new Error('Username or email already exists');
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Guardar el usuario en la base de datos
    await pool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);

    console.log('User saved successfully!');
  } catch (error) {
    console.error('Error saving user:', error.message);
  }
}


module.exports = saveUser;
