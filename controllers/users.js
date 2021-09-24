const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(() => {
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

const getUserId = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      const error = new Error('Пользователь не найден');
      error.status = 404;
      throw error;
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Некорректные данные' });
      } if (err.status === 404) {
        return res.status(404).send({ message: err.message });
      }
      return res.status(500).send({ message: `Произошла ошибка: ${err.message}` });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  console.log({ name, about, avatar });
  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Некорректные данные' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

const userInfo = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      const error = new Error('Пользователь не найден');
      error.status = 404;
      throw error;
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Некорректные данные' });
      } if (err.status === 404) {
        return res.status(404).send({ message: 'Невалидный id' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

const avatarUpdate = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      const error = new Error('Пользователь не найден');
      error.status = 404;
      throw error;
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Некорректные данные' });
      } if (err.status === 404) {
        return res.status(404).send({ message: 'Невалидный id' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports = {
  getUsers, getUserId, createUser, userInfo, avatarUpdate,
};
