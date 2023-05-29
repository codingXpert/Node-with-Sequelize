const express = require('express')
const bodyParser = require('body-parser')
require('./models/index');
const app = express()
var userCtrl = require('./controllers/userController')
const port = 3001

app.use(bodyParser.json()); 

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/add', userCtrl.addUser);
app.get('/users', userCtrl.getUsers);
app.get('/user/:id' , userCtrl.getUser);
app.get('/postUser' , userCtrl.postUser);
app.delete('/delete' , userCtrl.deleteUser);
app.patch('/patch/:id' , userCtrl.patchUser);
app.get('/finders' , userCtrl.finderUser);
app.get('/get-set-virtual' , userCtrl.getSetVirtual);
app.get('/validation' , userCtrl.validationCont);
app.get('/raw-queries', userCtrl.rawQueries);
app.get('/one-to-one' , userCtrl.oneToOne);
app.get("/one-to-many", userCtrl.oneToMany);
app.get("/many-to-many", userCtrl.manyToMany);
app.get("/belongTo", userCtrl.belongsTo);
app.get("/scopes", userCtrl.scopes);
app.get("/polymorphic", userCtrl.polymorphic);
app.get("/polymorphic-many", userCtrl.polymorphicMany);
app.get('/loading' , userCtrl.loading);
app.get("/paranoid", userCtrl.paranoid);
app.get("/transaction" , userCtrl.transaction);
app.get("/hooks", userCtrl.hooks);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})