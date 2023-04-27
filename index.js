const express = require('express')
const bodyParser = require('body-parser')
const User = require('./models/user')
const app = express()
const port = 3000

app.use(bodyParser.json()); 

app.get('/', (req, res) => {
  res.send('Hello World!')
});

User.sync({force:true})   // drop the users table and creates new

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})