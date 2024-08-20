const db = require ('../DB/mysql');

// Ejecutar una consulta
connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err.stack);
      return;
    }
    console.log('Resultados de la consulta:', results);
  });
  
  // Cierra la conexión cuando ya no la necesites
  connection.end((err) => {
    if (err) {
      console.error('Error al cerrar la conexión:', err.stack);
      return;
    }
    console.log('Conexión cerrada');
  });