const LogError = require('../../models/LogsError.model');

exports.logError = async (method, message, statusCode, stackTrace) => {
    try {
        
        await LogError.create({
            method: method,
            message: message,
            statusCode: statusCode,
            stackTrace: stackTrace,
            createdAt: new Date()
        });
    } catch (err) {
        console.error('Error al guardar el log:', err);
    }
};

