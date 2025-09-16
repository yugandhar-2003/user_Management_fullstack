const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

const storage = process.env.DATABASE_STORAGE || path.join(__dirname, '../../database.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage,
  logging: false,
});

const User = require('./user')(sequelize);

module.exports = {
  sequelize,
  User,
};