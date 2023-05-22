const db = require("../models");
const { Sequelize, Op, QueryTypes } = require("sequelize");
const User = db.user;
const Posts = db.posts;
const Tags = db.tags;
const Image = db.image;
const Video = db.video;
const Comment = db.comment;

//Add User
var addUser = async (req, res) => {
  const jane = await User.create({ firstName: "Jane", lastName: "singh" });
  console.log(jane instanceof User);
  console.log(jane.firstName);

  jane.set({ firstName: "Sohan", lastName: "singh" });
  await jane.update({ firstName: "Mohit", lastName: "singh" });
  await jane.save(); // in case of update we can use save() with update()
  // await jane.destroy();
  await jane.reload();
  res.status(200).json(jane.toJSON());
};

//Get Users
var getUsers = async (req, res) => {
  const users = await User.findAll({
    // order: [
    //     // Will escape title and validate DESC against a list of valid direction parameters
    //     ['id', 'ASC'],
    // ],
    // offset: 5,  //skip
    // limit: 5
  });
  res.status(200).json(users);
};

// get user by id
var getUser = async (req, res) => {
  //const users = await User.findOne({where:{id:req.params.id}});

  // This code is exactly similar as the above line
  const users = await User.findOne({
    where: {
      id: {
        [Op.and]: [{ id: 3 }, { firstName: "Deeepak" }],
      },
    },
  });
  res.status(200).json(users);
};
//Add user
// Inserting into db
var postUser = async (req, res) => {
  var messages = {};
  var user = {};

  try {
    var postData = req.body;
    if (postData.length > 1) {
      user = await User.bulkCreate(postData); // for bulk insertion/creation. ex:-[{},{}]
    } else {
      user = await User.create(postData); // for single insertion/creation
    }
  } catch (e) {
    let message;
    e.errors.forEach((error) => {
      // switch (error.validateorKey) {
      //     case 'isAlpha':
      //         message = error.message;
      //         break;
      //     case 'IsLowercase':
      //         message = 'only lower case is allowed';
      //         break;
      //     case 'len':
      //         message = 'min 2 char max 10 char is allowed'
      //         break;
      // }
      messages[error.path] = message; // error.path means from where the error is generating i.e firstName or lastName
    });
  }
  res.status(200).json({ data: user, messages: messages });
};

//delete
var deleteUser = async (req, res) => {
  const userId = req.params.id;
  const user = await User.destroy({
    truncate: true, //delets all the available data
  });
  res.status(200).json(user);
};

//update user
var patchUser = async (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;
  const user = await User.update(updatedData, {
    where: { id: userId },
  });
  res.status(200).json(user);
};

var finderUser = async (req, res) => {
  const { count, rows } = await User.findAndCountAll({
    where: {
      lastName: {
        [Op.like]: "%Kumar",
      },
    },
    offset: 0,
    limit: 10,
  });
  res.status(200).json({ data: rows, count: count });
};

var getSetVirtual = async (req, res) => {
  const rows = await User.findAll({
    where: { lastName: "Kumar" },
  });
  res.status(200).json({ data: rows });
};

var rawQueries = async (req, res) => {
  const users = await db.sequelize.query("SELECT * FROM Users WHERE id=$id", {
    bind: { id: "8" },
    type: QueryTypes.SELECT,
  });
  res.status(200).json({ data: users });
};

var validationCont = async (req, res) => {
  try {
    let data = await User.create({
      firstName: "Mohit",
      lastName: "User",
      gender: "male",
    });
  } catch (e) {
    const messages = {};
    e.errors.forEach((error) => {
      let message;
      switch (error.validateorKey) {
        case "not_unique":
          message = "Duplicate Email";
          break;

        case "isIn":
          message = "gender not in male/female";
          break;
      }
      messages[error.path] = message;
      console.log(messages);
    });
  }
};

var oneToOne = async (req, res) => {
  let data = await User.findAll({
    attributes: ["firstName", "gender"],
    include: [
      {
        model: Posts,
        as: "postDetail",
        attributes: ["title", ["name", "postName"]], // accessing name as postName
      },
    ],
    where: { id: 1 },
  });
  res.status(200).json(data);
};

var belongsTo = async (req, res) => {
  let posts = await Posts.findAll({
    attributes: ["title", "name"],
    include: [
      {
        model: User,
        attributes: ["firstName", "lastName"],
      },
    ],
  });
  res.status(200).json(posts);
};

var oneToMany = async (req, res) => {
  let data = await User.findAll({
    attributes: ["firstName", "gender"],
    include: [
      {
        model: Posts,
        as: "postDetail",
        attributes: ["title", ["name", "postName"]], // accessing name as postName
      },
    ],
    where: { id: 1 },
  });
  res.status(200).json(data);
};

// var manyToMany = async (req, res) => {
//   let data = await Posts.findAll({
//     include: {model: Tags},
//   });
//   res.status(200).json(data);
// };

var manyToMany = async (req, res) => {
  let data = await Tags.findAll({
    include: { model: Posts },
  });
  res.status(200).json(data);
};

var scopes = async (req, res) => {
  let data = await User.scope(["includePost", "addUser", "limitCheck"]).findAll(
    {}
  );
  res.status(200).json(data);
};

var polymorphic = async (req, res) => {
  //-------image to comment--------//
  // let data = await Image.findAll({
  //     include:[{
  //         model:Comment
  //     }]
  // });

  //-----------video to comment---------//
  // let data = await Video.findAll({
  //   include: [
  //     {
  //       model: Comment,
  //     },
  //   ],
  // });

  //---------comment to video/image--------//
  let data = await Comment.findAll({
    include: [
      {
        model: Video,
      },
    ],
  });
  res.status(200).json(data);
};

var polymorphicMany = async (req, res) => {
  // let data = await Image.findAll({
  //   include: [
  //     {
  //       model: Tags,
  //     },
  //   ],
  // });

  //------Tags to video or image
  let data = await Tags.findAll({
    include: [Video, Image],
  });

  res.status(200).json(data);
};

var loading = async (req, res) => {
  //------Lazy loading----//
  let data = await User.findOne({ where: { id: 1 } });
  let postData = await data.getPosts();
  let response = {
    users: data,
    posts: postData,
  };
  res.status(200).json(response);
};

module.exports = {
  addUser,
  getUsers,
  getUser,
  postUser,
  deleteUser,
  patchUser,
  finderUser,
  getSetVirtual,
  rawQueries,
  validationCont,
  oneToOne,
  belongsTo,
  oneToMany,
  manyToMany,
  scopes,
  polymorphic,
  polymorphicMany,
  loading,
};
