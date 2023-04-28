const db = require('../models');
const User = db.user;
var addUser = async(req , res) => {

     const jane = await User.create({ firstName: "Jane" , lastName:'singh'});
    console.log(jane instanceof User); 
    console.log(jane.firstName); 


    jane.set({firstName: "Sohan" , lastName:'singh'});
    await jane.update({ firstName: "Mohit" , lastName:'singh' })
    await jane.save() // in case of update we can use save() with update()
    res.status(200).json(jane.toJSON());
}

module.exports = {
    addUser
}