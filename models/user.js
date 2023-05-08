module.exports = (Model , sequelize , DataTypes) => {
class User extends Model {}

User.init({
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate:{
      isAlpha:{
        msg: 'Only Alphabets Are Allowed'
      }
    },
    isLowercase: true,
    len: [2,10],
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
  },
  fullName: {                          //The VIRTUAL field does not cause a column in the table to exist. 
                                      //In other words, the model above will not have a fullName column. However, it will appear to have it!
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.firstName} ${this.lastName}`;
    },
    set(value) {
      throw new Error('Do not try to set the `fullName` value!');
    }
  }
}, {
  sequelize, // We need to pass the connection instance
  modelName: 'User' // We need to choose the model name
});
return User;
}