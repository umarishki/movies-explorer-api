const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const DefaultError = require('../errors/default-err');
const ValidationError = require('../errors/validation-err');
const AuthError = require('../errors/auth-err');
const DataBaseError = require('../errors/dataconflict-err');

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return next(new NotFoundError('Пользователь по указанному _id не найден.'));
    }
    return res.send({ email: user.email, name: user.name });
  } catch (err) {
    return next(new DefaultError('Ошибка по умолчанию.'));
  }
};

const postUser = async (req, res, next) => {
  const {
    email,
    name,
    password,
  } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      name,
      password: hash,
    });
    return res.send({
      email: user.email,
      name: user.name,
      _id: user._id,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new ValidationError('Переданы некорректные данные при создании пользователя.'));
    }
    if (err.code === 11000) {
      return next(new DataBaseError('Данная электронная почта уже используется.'));
    }
    return next(new DefaultError('Ошибка по умолчанию.'));
  }
};

const patchCurrentUser = async (req, res, next) => {
  const { email, name } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { email, name },
      {
        new: true, // обработчик then получит на вход обновлённую запись
        runValidators: true, // данные будут валидированы перед изменением
        upsert: false, // если пользователь не найден, он будет создан
      },
    );
    if (!user) {
      return next(new NotFoundError('Пользователь по указанному _id не найден.'));
    }
    return res.send({ email: user.email, name: user.name });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new ValidationError('Переданы некорректные данные при создании пользователя.'));
    }
    if (err.code === 11000) {
      return next(new DataBaseError('Данная электронная почта уже используется.'));
    }
    return next(new DefaultError('Ошибка по умолчанию.'));
  }
};

const login = async (req, res, next) => {
  const {
    email,
    password,
  } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new AuthError('Неправильные почта или пароль.'));
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return next(new AuthError('Неправильные почта или пароль.'));
    }
    const { NODE_ENV, JWT_SECRET } = process.env;
    const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '2h' });
    return res.send({ data: token });
  } catch (err) {
    return next(new DefaultError('Ошибка по умолчанию.'));
  }
};

module.exports = {
  getCurrentUser,
  patchCurrentUser,
  postUser,
  login,
};
