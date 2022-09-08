const mongoose = require('mongoose');
const {
  regexUrl,
  regexRusLang,
  regexEngLang,
} = require('../utils/utils');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regexUrl.test(v),
      message: 'Неверный формат URL-адреса',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regexUrl.test(v),
      message: 'Неверный формат URL-адреса',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regexUrl.test(v),
      message: 'Неверный формат URL-адреса',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String, // заменить на тип, соответсвующий полю в ответе сервиса MoviesExplorer
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regexRusLang.test(v),
      message: 'Неверный формат: наименование должно содержать только русский алфавит',
    },
  },
  nameEN: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regexEngLang.test(v),
      message: 'Неверный формат: наименование должно содержать только латинский алфавит',
    },
  },
});

module.exports = mongoose.model('movie', movieSchema);
