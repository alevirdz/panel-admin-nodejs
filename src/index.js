// index.js
const app = require('./app.js');

const PORT = app.get('port');

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: ${PORT}`);
});
