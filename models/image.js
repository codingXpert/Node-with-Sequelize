module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define("image", {
    title: DataTypes.STRING,
    url: DataTypes.STRING,
  });
  return Image;
};
