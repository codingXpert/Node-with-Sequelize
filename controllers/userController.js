const db = require('../models');
const {Sequelize , Op} = require('sequelize');
const User = db.user;

//Add User
var addUser = async (req, res) => {
    const jane = await User.create({ firstName: "Jane", lastName: 'singh' });
    console.log(jane instanceof User);
    console.log(jane.firstName);


    jane.set({ firstName: "Sohan", lastName: 'singh' });
    await jane.update({ firstName: "Mohit", lastName: 'singh' })
    await jane.save() // in case of update we can use save() with update()
    // await jane.destroy();
    await jane.reload();
    res.status(200).json(jane.toJSON());
}

//Get Users
var getUsers = async (req, res) => {
    const users = await User.findAll({
        order: [
            // Will escape title and validate DESC against a list of valid direction parameters
            ['id', 'ASC'],
        ],
        offset: 5,  //skip
        limit: 5
    });
    res.status(200).json(users);
}

// get user by id 
var getUser = async (req, res) => {
    //const users = await User.findOne({where:{id:req.params.id}});

    // This code is exectly similar as the above line
    const users = await User.findOne({
        where: {
          id: {
            [Op.and]: [
                { id: 3 },
                { firstName: 'Deeepak' }
              ]
          }
        }
      });
    res.status(200).json(users);
}
//Add user
// Inserting into db
var postUser = async (req , res) => {
    var postData = req.body;
    if(postData.length>1){    
    var user = await User.bulkCreate(postData);  // for bulk insertion/creation. ex:-[{},{}]
    }else{
    var user = await User.create(postData);  // for single insertion/creation
    }
    res.status(200).json(user);
}

//delete
var deleteUser = async (req , res) => {
    const userId = req.params.id
    const user = await User.destroy({
        truncate: true    //delets all the available data
    });
    res.status(200).json(user);
}

//update user
var patchUser = async (req , res) => {
    const userId = req.params.id;
    const updatedData = req.body;
    const user = await User.update(updatedData,{
        where:{id:userId}
    });
    res.status(200).json(user);
}

var finderUser = async (req, res) => {
    const users = await User.findOne({
        where:{lastName:'kumar'}         // fetches the first record amoung all the records whose lastName is kumar
    });
    res.status(200).json(users);
}

module.exports = {
    addUser,
    getUsers,
    getUser,
    postUser,
    deleteUser,
    patchUser,
    finderUser
}