const User = require('../models/user');

// POST
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'ошибка сервера' });
    });
};

// GET
const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'ошибка сервера' });
    });
};

// GET
const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(404).send({ message: 'данные не найдены' });
      }
      return res.status(500).send({ message: 'ошибка сервера' });
    });
};

// PATCH
const updateProfile = (req, res) => {
  const { _id } = req.user;
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    _id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'переданы некорректные данные' });
      }
      if (err.name === 'CastError') {
        return res.status(404).send({ message: 'данные не найдены' });
      }
      return res.status(500).send({ message: 'ошибка сервера' });
    });
};

// PATCH
const updateAvatar = (req, res) => {
  const { _id } = req.user;
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    _id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'переданы некорректные данные' });
      }
      if (err.name === 'CastError') {
        return res.status(404).send({ message: 'данные не найдены' });
      }
      return res.status(500).send({ message: 'ошибка сервера' });
    });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateProfile,
  updateAvatar,
};
