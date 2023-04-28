const db = require('../models');
const User = db.user;
var addUser = async(req , res) => {
    const jane = User.build({ firstName: "Jane" , lastName:'kumar'});
    console.log(jane instanceof User); // true
    console.log(jane.name); // "Jane"
    await jane.save();
    console.log('Jane was saved to the database!');
    res.status(200).json(jane.toJSON());
}

module.exports = {
    addUser
}