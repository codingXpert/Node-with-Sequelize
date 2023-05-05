module.exports = (Model , sequelize , DataTypes) => {
class User extends Model {}

User.init({
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      const rawValue = this.getDataValue('firstName');
      return rawValue ? 'Mr. ' + rawValue.toUpperCase() : null;
    }
  },
  lastName: {
    type: DataTypes.STRING,
    set(value) {
      this.setDataValue('lastName', value + ' ,Indian');
    }
  }
}, {
  sequelize, // We need to pass the connection instance
  modelName: 'User' // We need to choose the model name
});
return User;
}