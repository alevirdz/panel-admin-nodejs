const respuesta = require('../red/respuestas');
const index  = (req, res)=>{
    respuesta.success(req, res, 'Todo bien en index', 200)
};

module.exports = { index,}