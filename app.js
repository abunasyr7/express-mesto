const express = require('express');
const mongoose = require('mongoose');
const usersRoute = require('./routes/users');
const cardRoute = require('./routes/cards');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '614d57ce01d08d6f5173b126',
  };
});

app.use('/', express.json());
app.use('/', usersRoute);
app.use('/', cardRoute);
app.use((req, res) => {
  res.status(404).send({ message: 'Error 404' });
});

app.listen(3000, () => {
  console.log('Server has been started');
});
