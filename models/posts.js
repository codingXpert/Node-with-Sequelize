module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define(
    "posts",
    {
      name: DataTypes.STRING,
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Posts;
};
