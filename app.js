const express = require('express');
const mongoose = require('mongoose');
const usersRoute = require('./routes/users');
const cardRoute = require('./routes/cards');
const { login, createUser } = require('./controllers/users');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use('/', express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '614d57ce01d08d6f5173b126',
  };
  next();
});

app.use('/', usersRoute);
app.use('/', cardRoute);
app.use((req, res) => {
  res.status(404).send({ message: 'Error 404' });
});
app.post('/signin', login);
app.post('/signup', createUser);

app.listen(3000, () => {
  console.log('Server has been started');
});
