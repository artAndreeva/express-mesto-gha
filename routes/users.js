const usersRouter = require('express').Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

usersRouter.post('/', createUser);
usersRouter.get('/', getAllUsers);
usersRouter.get('/:userId', getUserById);
usersRouter.patch('/me', updateProfile);
usersRouter.patch('/me/avatar', updateAvatar);

module.exports = usersRouter;
