const Movie = require('../models/movie');

const getSavedMovies = async (req, res, next) => {
  req.user = { _id: '6315f9eb574ba0a73bd77e09' };
  try {
    const movies = await Movie.find({ owner: req.user._id });
    res.send(movies);
    return movies;
  }
  catch (err) {
    if (err) {
      return res.status(500).send({ message: 'Произошла ошибка' });
    }
  }
};

const postSavedMovie = async (req, res, next) => {
  req.user = { _id: '6315f9eb574ba0a73bd77e09' };
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

    const isDublicateSavedMovie = savedMovies.some((movie) => {
      return (movie.movieId === movieId && String(movie.owner) === String(req.user._id));
    });

    if (isDublicateSavedMovie) {
      return res.status(500).send({ message: 'Данный фильм уже сохранен' });
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
  }
  catch (err) {
    if (err) {
      return res.status(500).send({ message: 'Произошла ошибка' });
    }
  }
};

const deleteSavedMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie) {
      return res.status(500).send({ message: 'Передан несуществующий id фильма.'});
    }
    res.send(movie);
  }
  catch (err) {
    if (err) {
      return res.status(500).send({ message: 'Произошла ошибка' });
    }
  }
};

module.exports = {
  getSavedMovies,
  postSavedMovie,
  deleteSavedMovie,
}