const sequelize = require('./index')
const { DataTypes, Model } = require('sequelize');

class User extends Model {}

User.init({
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
  }
}, {
  sequelize, // We need to pass the connection instance
  modelName: 'User' // We need to choose the model name
});
console.log(User === sequelize.models.User); // true
module.exports = User;