const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const DefaultError = require('../errors/default-err');
const ValidationError = require('../errors/validation-err');
const ForbiddenError = require('../errors/forbidden-err');

const getSavedMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id });
    if (!movies) {
      return next(new NotFoundError('Для данного пользователя нет сохраненных фильмов.'));
    }
    return res.send(movies);
  } catch (err) {
    return next(new DefaultError('Ошибка по умолчанию.'));
  }
};

const postSavedMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  try {
    const savedMovies = await Movie.find({ owner: req.user._id });

    const isDublicateSavedMovie = savedMovies.some((movie) => movie.movieId === movieId);
    if (isDublicateSavedMovie) {
      return next(new ValidationError('Данный фильм уже сохранен'));
    }

    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner: req.user._id,
      movieId,
      nameRU,
      nameEN,
    });
    return res.send(movie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new ValidationError('Переданы некорректные данные при создании карточки.'));
    }
    return next(new DefaultError('Ошибка по умолчанию.'));
  }
};

const deleteSavedMovie = async (req, res, next) => {
  try {
    let movie = await Movie.findById(req.params.id);
    if (!movie) {
      return next(new NotFoundError('Передан несуществующий id фильма.'));
    }
    if (!(String(movie.owner) === String(req.user._id))) {
      return next(new ForbiddenError('Нельзя удалить фильм, сохраненный другим пользователем.'));
    }
    movie = await movie.remove();
    return res.send(movie);
  } catch (err) {
    return next(new DefaultError('Ошибка по умолчанию.'));
  }
};

module.exports = {
  getSavedMovies,
  postSavedMovie,
  deleteSavedMovie,
};
