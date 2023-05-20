module.exports = (sequelize, DataTypes) => {
  const Post_Tags = sequelize.define("posts_tags",{
      postId: DataTypes.INTEGER,
      tagId: DataTypes.INTEGER,
    },{timestamps:false}  
  );
  return Post_Tags;
};
