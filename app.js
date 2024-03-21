const express = require('express');
const mongoose = require('mongoose');
const app = express();

const port = 3000;
const portMongo = 27017;

const mongoUrl = `mongodb://localhost:${portMongo}`;
const connUser = mongoose.createConnection(`${mongoUrl}/dbtest`)

const userSchema = new mongoose.Schema({
  name: {type:String,required:true},
  email: {type:String,required:true},
});

const usersModel = connUser.model('mongouser', userSchema);

app.get('/', async (req, res) => {
  const users = await usersModel.find({});
  res.json(users);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});