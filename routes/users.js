const usersRouter = require('express').Router();
const { userUpdateValid } = require('../middlewares/validation');
const {
  getMeUser,
  updateUser,
} = require('../controllers/user');

usersRouter.get('/me', getMeUser);
usersRouter.patch('/me', updateUser, userUpdateValid);

module.exports = usersRouter;
