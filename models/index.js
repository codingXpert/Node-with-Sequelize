const { Sequelize, DataTypes, Model } = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize(
  "node_sequelize_api",
  "root",
  process.env.PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    logging: true,
  }
);

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user")(Model, sequelize, DataTypes);
db.contact = require("./contact")(sequelize, DataTypes);
db.posts = require("./posts")(sequelize, DataTypes);
db.tags = require('./tags')(sequelize , DataTypes);
db.post_tag = require("./post_tag")(sequelize, DataTypes);
db.tag_taggable = require("./tag_taggable")(sequelize, DataTypes);
db.student = require("./student")(sequelize, DataTypes);

db.user.addScope("checkStatus", {
  where: {
    status: 1,
  },
});

db.user.addScope("checkGender", {
  where: {
    gender: "male",
  },
});

db.user.addScope("includePost", {
  include: {
    model: db.posts,
  },
});

db.user.addScope("addUser", {
  attributes: ['firstName' , 'lastName']
});

db.user.addScope("limitCheck", {
  limit: 2,
});

db.user.hasMany(db.posts, { foreignKey: "userId"});
db.posts.belongsTo(db.user.scope('checkStatus'), { foreignKey: "userId"});

db.posts.belongsToMany(db.tags , {through:'posts_tags'});
db.tags.belongsToMany(db.posts , {through:'posts_tags'});

// ------------ Polymorphic One To Many -----------//
db.comment = require("./comment")(sequelize, DataTypes);
db.video = require("./video")(sequelize, DataTypes);
db.image = require("./image")(sequelize, DataTypes);
db.employee = require("./employees")(sequelize, DataTypes);

db.image.hasMany(db.comment , {
  foreignKey:'commentableId',
  constraints:false,
  scope:{
    commentableType:'image'
  }
});

db.video.hasMany(db.comment, {
  foreignKey: "commentableId",
  constraints: false,
  scope: {
    commentableType: 'video',
  },
});

db.comment.belongsTo(db.image, {
  foreignKey: "commentableId",
  constraints: false,
});

db.comment.belongsTo(db.video, {
  foreignKey: "commentableId",
  constraints: false,
});

//---------Polymorphic-Many-To-Many--------//
db.tag_taggable = require("./tag_taggable")(sequelize, DataTypes);

//Image to tag
db.image.belongsToMany(db.tags,{
  through:{
    model:db.tag_taggable,
    unique:false,
    scope:{
      taggableType:'image'
    }
  },
  foreignKey:'taggableId',
  constraints:false
});

//tag to image
db.tags.belongsToMany(db.image, {
  through: {
    model: db.tag_taggable,
    unique: false,
    scope: {
      taggableType: "image",
    },
  },
  foreignKey: "tagId",
  constraints: false,
});

//Video To Tag
db.video.belongsToMany(db.tags, {
  through: {
    model: db.tag_taggable,
    unique: false,
    scope: {
      taggableType: "video",
    },
  },
  foreignKey: "tagId",
  constraints: false,
});


//Tag To Video
db.tags.belongsToMany(db.video, {
  through: {
    model: db.tag_taggable,
    unique: false,
    scope: {
      taggableType: "video",
    },
  },
  foreignKey: "taggableId",
  constraints: false,
});
db.sequelize.sync({ force: false });

module.exports = db;
