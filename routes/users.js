const router = require('express').Router();
const {
  getUsers, getUserId, createUser, userInfo, avatarUpdate,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:userId', getUserId);
router.post('/users', createUser);
router.patch('/users/me', userInfo);
router.patch('/users/me/avatar', avatarUpdate);

module.exports = router;// экспортировали роутер
