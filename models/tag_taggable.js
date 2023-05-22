module.exports = (sequelize, DataTypes) => {
  const Tag_taggable = sequelize.define("tag_taggable", {
    tagId: {
      type: DataTypes.STRING,
      unique: "tt_unique_constraints",
    },
    taggableId: {
      type: DataTypes.INTEGER,
      unique: "tt_unique_constraints",
      references: null,
    },
    taggableType: {
      type: DataTypes.STRING,
      unique: "tt_unique_constraints",
    },
  });
  return Tag_taggable;
};
