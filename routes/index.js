const router = require('express').Router();
const { createUser, loginUser, logoutUser } = require('../controllers/user');
const { userRegisterValid, userLoginValid } = require('../middlewares/validation');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const allowedCors = require('../middlewares/allowedCors');

router.use(allowedCors);

router.post('/signup', userRegisterValid, createUser);
router.post('/signin', userLoginValid, loginUser);
router.use(auth);
router.delete('/signout', logoutUser);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден. '));
});

module.exports = router;
