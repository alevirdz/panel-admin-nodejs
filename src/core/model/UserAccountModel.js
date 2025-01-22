const { DataTypes } = require('sequelize');
const connection = require('../database/mysql');
const Role = require('../model/RolesModel');
const Themes = require('../model/ThemesModel');

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
    selected_theme_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Themes',
            key: 'id',
        },
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
Usuario.belongsTo(Themes, {
    foreignKey: 'selected_theme_id',
    as: 'selectedTheme',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
});

module.exports = Usuario;