const db = require('../models');
const User = db.user;
var addUser = async(req , res) => {
    // const jane = User.build({ firstName: "Jane" , lastName:'kumar'});
     const jane = await User.create({ firstName: "Jane" , lastName:'singh'});
    console.log(jane instanceof User); // true
    console.log(jane.firstName); // "Jane"
    // await jane.save();

    jane.set({firstName: "Sohan" , lastName:'singh'});
    await jane.save() // in case of update we can use save() with update()
    res.status(200).json(jane.toJSON());
}

module.exports = {
    addUser
}