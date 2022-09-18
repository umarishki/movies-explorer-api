const router = require('express').Router();
const {
  postUser,
  login,
} = require('../controllers/users');
const {
  signupValidation,
  signinValidation,
} = require('../validation/auth');

router.post('/signup', signupValidation, postUser);

router.post('/signin', signinValidation, login);

module.exports = router;
