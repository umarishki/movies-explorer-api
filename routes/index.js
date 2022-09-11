const router = require('express').Router();

router.use(require('./auth'));

router.use(require('../middlewares/auth'));

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

module.exports = router;
