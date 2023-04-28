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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})