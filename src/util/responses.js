const statusCodes = require('../core/logs/LogsStatusCodes');

exports.success = (req, res, message = '', status = 200) => {
    const { code, description } = statusCodes[status] || statusCodes[200];
    res.status(code).send({
        error: false,
        code: code,
        status: description,
        response: message
    });
};


exports.error = (req, res, message = 'Internal Error', status = 500) => {
    const { code, description } = statusCodes[status] || statusCodes[500];
    res.status(code).send({
        error: true,
        status: description,
        response: message
    });
};

