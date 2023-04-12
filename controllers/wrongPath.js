const wrongPath = (req, res) => {
  res.status(404).send({ message: 'неправильный путь' });
};

module.exports = { wrongPath };
