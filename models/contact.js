module.exports = (sequelize , DataTypes) => {
const Contact = sequelize.define('contact', {
  permanent_address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  current_address: {
    type: DataTypes.STRING
  },
  user_id:DataTypes.INTEGER 
});
return Contact;
}