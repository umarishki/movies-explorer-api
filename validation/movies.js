const { celebrate, Joi } = require('celebrate');
const {
  regexUrl,
  regexHex,
  regexRusLang,
  regexEngLang,
} = require('../utils/utils');

const saveMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regexUrl),
    trailerLink: Joi.string().required().pattern(regexUrl),
    thumbnail: Joi.string().required().pattern(regexUrl),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().pattern(regexRusLang),
    nameEN: Joi.string().required().pattern(regexEngLang),
  }),
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).pattern(regexHex),
  }),
});

module.exports = {
  saveMovieValidation,
  deleteMovieValidation,
};
