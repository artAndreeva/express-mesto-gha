const Card = require('../models/card');

// POST
const createCard = (req, res) => {
  const { _id } = req.user;
  const { name, link } = req.body;
  Card.create({ name, link, owner: _id })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'ошибка сервера' });
    });
};

// GET
const getAllCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'ошибка сервера' });
    });
};

// DELETE
const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'данные не найдены' });
      }
      return res.status(500).send({ message: 'ошибка сервера' });
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
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'переданы некорректные данные' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'данные не найдены' });
      }
      return res.status(500).send({ message: 'ошибка сервера' });
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
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'переданы некорректные данные' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'данные не найдены' });
      }
      return res.status(500).send({ message: 'ошибка сервера' });
    });
};

module.exports = {
  createCard,
  getAllCards,
  deleteCard,
  likeCard,
  unlikeCard,
};
