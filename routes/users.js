const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getProfile,
} = require('../controllers/users');
const { regExp } = require('../utills/constants');

usersRouter.get('/', getAllUsers);
usersRouter.get('/me', getProfile);

usersRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), getUserById);

usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);

usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(regExp),
  }),
}), updateAvatar);

module.exports = usersRouter;
