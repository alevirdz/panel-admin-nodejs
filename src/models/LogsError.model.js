const { DataTypes } = require('sequelize');
const connection = require('../DB/mysql');

const LogError = connection.define('Logs', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    method: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    statusCode: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stackTrace:{
        type: DataTypes.TEXT,
        allowNull: true,
    },
    createdAt:{
        type:DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'logs',
    updatedAt: false,
});

module.exports = LogError;
