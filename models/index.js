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

db.sequelize.sync({ force: false });

module.exports = db;
