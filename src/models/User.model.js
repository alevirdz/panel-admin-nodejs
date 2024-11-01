const { DataTypes } = require('sequelize');
const connection = require('../core/database/mysql');



const Usuario = connection.define('accounts', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
    {
      timestamps: true,
  });

  module.exports = Usuario;