const router = require('express').Router();
const {
  getCurrentUser,
  patchCurrentUser,
} = require('../controllers/users');
const {
  updateUserValidation,
} = require('../validation/users');

router.get('/me', getCurrentUser);

router.patch('/me', updateUserValidation, patchCurrentUser);

module.exports = router;
