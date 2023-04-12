const BAD_REQUEST_ERROR = 400;
const NOT_FOUND_ERROR = 404;
const SERVER_ERROR = 500;

const checkId = (id, res) => {
  if (!id) {
    return res.status(NOT_FOUND_ERROR).send({ message: 'данные не найдены' });
  }
  return res.send(id);
};

const checkErrors = (err, res) => {
  if (err.name === 'ValidationError') {
    return res.status(BAD_REQUEST_ERROR).send({ message: 'переданы некорректные данные' });
  }
  if (err.name === 'CastError') {
    return res.status(BAD_REQUEST_ERROR).send({ message: 'переданы некорректные данные' });
  }
  if (err.name === 'DocumentNotFoundError') {
    return res.status(NOT_FOUND_ERROR).send({ message: 'данные не найдены' });
  }
  return res.status(SERVER_ERROR).send({ message: 'ошибка сервера' });
};

module.exports = {
  checkId,
  checkErrors,
};
