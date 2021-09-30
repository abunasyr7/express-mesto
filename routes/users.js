const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserId, userInfo, avatarUpdate,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24),
  }),
}), getUserId);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(3).max(15),
    about: Joi.string().required().min(3).max(15),
  }),
}), userInfo);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .regex(/^(https?:\/\/)?([\da-z\\.-]+)\.([a-z\\.]{2,6})([/\w \\.-]*)*\/?$/),
  }),
}), avatarUpdate);

module.exports = router;// экспортировали роутер
