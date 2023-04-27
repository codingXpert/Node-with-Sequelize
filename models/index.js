require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node_sequelize_api', 'root', process.env.PASSWORD, {
    host: 'localhost',
    dialect:'mysql'
});

try {
     sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  module.exports = sequelize;