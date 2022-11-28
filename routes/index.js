const router = require('express').Router();
const { createUser, loginUser, logoutUser } = require('../controllers/user');
const { userRegisterValid, userLoginValid } = require('../middlewares/validation');
const auth = require('../middlewares/auth');
const NotFoundError = require('../Errors/NotFoundError');
const allowedCors = require('../middlewares/allowedCors');

router.use(allowedCors);

router.post('/signup', createUser, userRegisterValid);
router.post('/signin', loginUser, userLoginValid);
router.delete('/signout', logoutUser);
router.use(auth);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден. '));
});

module.exports = router;
