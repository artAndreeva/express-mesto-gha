const Card = require('../models/card');
const checkId = require('../utills/checks');
const checkErrors = require('../utills/checks');

// POST
const createCard = (req, res) => {
  const { _id } = req.user;
  const { name, link } = req.body;
  Card.create({ name, link, owner: _id })
    .then((card) => {
      checkId(card, res);
    })
    .catch((err) => {
      checkErrors(err, res);
    });
};

// GET
const getAllCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((card) => {
      checkId(card, res);
    })
    .catch((err) => {
      checkErrors(err, res);
    });
};

// DELETE
const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => {
      checkId(card, res);
    })
    .catch((err) => {
      checkErrors(err, res);
    });
};

// PUT
const likeCard = (req, res) => {
  const { _id } = req.user;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: _id } },
    { new: true },
  )
    .then((card) => {
      checkId(card, res);
    })
    .catch((err) => {
      checkErrors(err, res);
    });
};

// PATCH
const unlikeCard = (req, res) => {
  const { _id } = req.user;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: _id } },
    { new: true },
  )
    .then((card) => {
      checkId(card, res);
    })
    .catch((err) => {
      checkErrors(err, res);
    });
};

module.exports = {
  createCard,
  getAllCards,
  deleteCard,
  likeCard,
  unlikeCard,
};
