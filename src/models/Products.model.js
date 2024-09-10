const { DataTypes } = require('sequelize');
const connection = require('../DB/mysql');


const Product = connection.define('product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
  },
  updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW
  }
  }, {
      tableName: 'product',
      timestamps: true 
  });

  
module.exports = Product;