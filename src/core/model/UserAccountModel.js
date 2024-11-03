const { DataTypes } = require('sequelize');
const connection = require('../database/mysql');
const Role = require('../model/RolesModel');

const Usuario = connection.define('accounts', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
});

// Asociaciones
Usuario.belongsToMany(Role, {
    through: 'accounts_roles',
    foreignKey: 'user_id',
    otherKey: 'role_id',
    timestamps: false,
});

module.exports = Usuario;