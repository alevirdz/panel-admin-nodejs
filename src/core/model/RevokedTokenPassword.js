const { DataTypes } = require('sequelize');
const connection = require('../database/mysql');

const RevokedTokenPassword = connection.define('RevokedTokenPassword', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    isRevoked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    revokedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'token_passwords',
    timestamps: false,
});

module.exports = RevokedTokenPassword;
