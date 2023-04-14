const BAD_REQUEST_ERROR = 400;
const NOT_FOUND_ERROR = 404;
const SERVER_ERROR = 500;

const checkId = (id, res) => {
  if (!id) {
    return res.status(NOT_FOUND_ERROR).send({ message: 'карточка или пользователь не найден' });
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
    return res.status(NOT_FOUND_ERROR).send({ message: 'карточка или пользователь не найден' });
  }
  return res.status(SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
};

module.exports = {
  checkId,
  checkErrors,
};
