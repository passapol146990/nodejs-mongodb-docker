const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// const mongoUrl = 'mongodb://mongodb/mydb';
const mongoUrl = 'mongodb://locahost:27019';

// mongoose.connect(mongoUrl, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
  // .then(() => console.log('MongoDB connected'))
  // .catch(err => console.error('MongoDB connection error:', err));
const dba = mongoose.createConnection(`${mongoUrl}/dbtest`)

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = dba.model('User', userSchema);

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});