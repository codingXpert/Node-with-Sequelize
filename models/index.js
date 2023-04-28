const { Sequelize , DataTypes , Model} = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize('node_sequelize_api', 'root', process.env.PASSWORD, {
    host: 'localhost',
    dialect:'mysql',
    logging:false
});

try {
     sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  const db = {};
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;

  db.contact = require('./contact')( sequelize , DataTypes);
  db.user = require('./user')(Model , sequelize , DataTypes);
  db.sequelize.sync({force:true});

  module.exports = db;