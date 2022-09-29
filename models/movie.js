const mongoose = require('mongoose');
const {
  regexUrl,
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
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
