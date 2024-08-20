exports.success = (req, res, menssage = '', status = 200) => {
    res.status(status).send({
        error: false,
        status: status,
        body: menssage
    });
};


exports.error = (req, res, menssage = 'Intertal Error', status = 500) => {
    res.status(status).send({
        error: true,
        status: status,
        body: menssage
    });
};
