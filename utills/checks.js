const checkId = (id, res) => {
  if (id) {
    return res.send(id);
  }
  return res.status(400).send({ message: 'переданы некорректные данные' });
};

const checkErrors = (err, res) => {
  if (err.name === 'ValidationError') {
    return res.status(400).send({ message: 'переданы некорректные данные' });
  }
  if (err.name === 'DocumentNotFoundError') {
    return res.status(404).send({ message: 'данные не найдены' });
  }
  return res.status(500).send({ message: 'ошибка сервера' });
};

module.exports = {
  checkId,
  checkErrors,
};
