const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError'); // 400
const NotFoundError = require('../errors/NotFoundError'); // 404
const ForbiddenError = require('../errors/ForbiddenError'); // 403
const { CAST_ERROR, VALIDATION_ERROR } = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
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

  Movie.create({
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
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.message === VALIDATION_ERROR) {
        return next(new BadRequestError('Ошибка валидации. Переданы некорректные данные при создании фильма. '));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError('Передан несуществующий _id фильма. '))
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        return Movie.findByIdAndRemove(req.params.movieId)
          .then((movieDelete) => res.send(movieDelete));
      }
      return next(new ForbiddenError('Недостаточно прав для удаления фильма. '));
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        return next(new BadRequestError('Не корректный _id фильма. '));
      }

      return next(err);
    });
};
