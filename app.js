const express = require('express');
const mongoose = require('mongoose');
const usersRoute = require('./routes/users')

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb')

app.use('/', express.json());
app.use('/', usersRoute);

app.listen(3000)