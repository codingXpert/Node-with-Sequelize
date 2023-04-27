module.exports = (Model , sequelize , DataTypes) => {
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
}