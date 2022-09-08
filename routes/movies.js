const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getSavedMovies,
  postSavedMovie,
  deleteSavedMovie,
} = require('../controllers/movies');
const {
  regexUrl,
  regexHex,
  regexRusLang,
  regexEngLang,
} = require('../utils/utils');

router.get('/', getSavedMovies);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regexUrl),
    trailerLink: Joi.string().required().pattern(regexUrl),
    thumbnail: Joi.string().required().pattern(regexUrl),
    movieId: Joi.string().required(),
    nameRU: Joi.string().required().pattern(regexRusLang),
    nameEN: Joi.string().required().pattern(regexEngLang),
  }),
}), postSavedMovie);

router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).pattern(regexHex),
  }),
}), deleteSavedMovie);

module.exports = router;
