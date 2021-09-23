const User = require('../models/user');

const getUsers = (req,res) => {
  User.find({})
    .then((users)=> {
      res.stats(200).send(users)
    })
    .catch((err) => {
      console.log(err)
    })
}

const getUserId = (req,res) => {
  const {userId} = req.params;
  User.findById(userId)
    .orFail(() => {
      const error = new Error('Пользователь не найден');
      error.status = 404;
      throw error;
    })
    .then((user) => {
      res.status(200).send(user)
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({message: 'Некорректные данные'})
      } else if(err.statusCode === 404) {
        res.status(404).send({message:err.message})
      } else {
        res.status(500).send({message: `Произошла ошибка: ${err.message}`})
      }
    })
}

const createUser = (req, res) => {
  const {name, about, avatar} = req.body;
  User.create({name, about, avatar})
    .then((user) => {
      res.send(user)
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = {getUsers, getUserId, createUser};