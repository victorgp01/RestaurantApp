const { DataTypes } = require('sequelize');
const { db } = require('../database/db');

const User = db.define('user', {
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  passwordChangeAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM('client', 'admin'),
    allowNull: false,
    defaultValue: 'client',
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

module.exports = User;
