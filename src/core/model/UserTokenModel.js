const { DataTypes } = require('sequelize');
const connection = require('../database/mysql');

const RevokedToken = connection.define('RevokedToken', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'accounts',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    revoked: {
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
    tableName: 'token',
    timestamps: false,
});

module.exports = RevokedToken;
