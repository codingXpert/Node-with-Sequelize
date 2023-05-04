const express = require('express')
const bodyParser = require('body-parser')
require('./models/index');
const app = express()
var userCtrl = require('./controllers/userController')
const port = 3000

app.use(bodyParser.json()); 

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/add', userCtrl.addUser);
app.get('/users', userCtrl.getUsers);
app.get('/user/:id' , userCtrl.getUser);
app.post('/postUser' , userCtrl.postUser);
app.delete('/deleteUser/:id' , userCtrl.deleteUser);
app.patch('/patch/:id' , userCtrl.patchUser);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})