const router = require('express').Router();
const {
  getSavedMovies,
  postSavedMovie,
  deleteSavedMovie,
} = require('../controllers/movies');
const {
  saveMovieValidation,
  deleteMovieValidation,
} = require('../validation/movies');

router.get('/', getSavedMovies);
router.post('/', saveMovieValidation, postSavedMovie);

router.delete('/:id', deleteMovieValidation, deleteSavedMovie);

module.exports = router;
