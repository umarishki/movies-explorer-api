const router = require('express').Router();
const {
  getSavedMovies,
  postSavedMovie,
  deleteSavedMovie,
} = require('../controllers/movies');

router.get('/', getSavedMovies);
router.post('/', postSavedMovie);
router.delete('/:id', deleteSavedMovie);

module.exports = router;