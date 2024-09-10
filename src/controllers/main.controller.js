const response = require('../red/responses');
const index  = (req, res)=>{
    response.success(req, res, 'Todo bien en index', 200)
};

module.exports = { index,}