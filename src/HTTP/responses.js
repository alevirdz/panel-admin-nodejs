exports.success = (req, res, message = '', status = 200) => {
    res.status(status).send({
        error: false,
        status: status,
        response: message
    });
};


exports.error = (req, res, message = 'Internal Error', status = 500) => {
    res.status(status).send({
        error: true,
        status: status,
        response: message
    });
};