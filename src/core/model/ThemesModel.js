const { DataTypes } = require('sequelize');
const connection = require('../database/mysql');

const Themes = connection.define('Themes', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    background: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    colorText: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    colorIco: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hoverBackground: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    backgroundItemActive: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    colorTextAndIcoActive: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isImage: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    backgroundImageCoverEffect: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'themes',
    timestamps: false,
});

Themes.associate = models => {
    Themes.hasOne(models.Accounts, {
        foreignKey: 'selected_theme_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    });
};

module.exports = Themes;
