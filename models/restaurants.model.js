const { DataTypes } = require('sequelize');
const { db } = require('../database/db');

const Restaurant = db.define('restaurant', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  rating: {
    type: DataTypes.ENUM('1', '2', '3', '4', '5'),
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM('active', 'disable'),
    allowNull: false,
    defaultValue: 'active',
  },
});

module.exports = Restaurant;
