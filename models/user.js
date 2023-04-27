const { DataTypes } = require('sequelize');
const sequelize = require('./index')

const User = sequelize.define('user', {

  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
  }
}, {
    tableName:'Users'//optional
});
console.log(User === sequelize.models.User); // true
module.exports = User;