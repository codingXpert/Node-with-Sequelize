const db = require('../models');
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
    const users = await User.findAll({});
    res.status(200).json(users);
}

// get user by id 
var getUser = async (req, res) => {
    const users = await User.findOne({where:{id:req.params.id}});
    res.status(200).json(users);
}

var postUser = async (req , res) => {
    var postData = req.body;
    if(typeof(postData ===[])){    
    var user = await User.bulkCreate(postData);  // for bulk insertion/creation. ex:-[{},{}]
    }else{
    var user = await User.create(postData);  // for single insertion/creation
    }
    res.status(200).json(user);
}

module.exports = {
    addUser,
    getUsers,
    getUser,
    postUser
}