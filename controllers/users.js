const User = require('../models/user');
const checkId = require('../utills/checks');
const checkErrors = require('../utills/checks');

// POST
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      checkErrors(err, res);
    });
};

// GET
const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      checkErrors(err, res);
    });
};

// GET
const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      checkId(user, res);
    })
    .catch((err) => {
      checkErrors(err, res);
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
      checkId(user, res);
    })
    .catch((err) => {
      checkErrors(err, res);
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
      checkId(user, res);
    })
    .catch((err) => {
      checkErrors(err, res);
    });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateProfile,
  updateAvatar,
};
