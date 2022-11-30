const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { MONGO_DB_CODE } = require('../utils/constants');
const BadRequestError = require('../errors/BadRequestError'); // 400
const NotFoundError = require('../errors/NotFoundError'); // 404
const ConflictError = require('../errors/ConflictError'); // 409
const { CAST_ERROR, VALIDATION_ERROR } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then((user) => User.findById(user._id))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === MONGO_DB_CODE) {
        return next(new ConflictError('Пользователь с таким email уже существует. '));
      }
      if (err.message === VALIDATION_ERROR) {
        return next(new BadRequestError('Ошибка валидации. Переданы некорректные данные при создании профиля. '));
      }
      return next(err);
    });
};

module.exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: 'None', secure: true,
        })
        .send({ message: 'Авторизация прошла успешно. ' });
    })
    .catch(next);
};

module.exports.logoutUser = (req, res) => {
  res
    .clearCookie('jwt', { secure: 'true', sameSite: 'none' })
    .send({ message: 'Деавторизация прошла успешно. ' });
};

module.exports.getMeUser = (req, res, next) => {
  console.log(req.user);
  User.findById(req.user._id)
    .orFail(new NotFoundError('Пользователь не найден. '))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        return next(new BadRequestError('Передан не корректный _id пользователя. '));
      }
      return next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .orFail(new NotFoundError('Пользователь не найден. '))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === VALIDATION_ERROR) {
        return next(new BadRequestError('Ошибка валидации. Переданы некорректные данные при обновлении профиля. '));
      }
      if (err.code === MONGO_DB_CODE) {
        return next(new ConflictError('Пользователь с таким email уже существует. '));
      }
      return next(err);
    });
};
