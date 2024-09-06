const { DataTypes } = require('sequelize');
const connection = require('../DB/mysql');

const Permission = connection.define('Permission', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'permissions'
});

module.exports = Permission;
