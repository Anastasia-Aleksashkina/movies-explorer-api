const Movie = require('../models/movie');
const BadRequestError = require('../Errors/BadRequestError'); // 400
const NotFoundError = require('../Errors/NotFoundError'); // 404
const ForbiddenError = require('../Errors/ForbiddenError'); // 403

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
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
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.message === 'Validation failed') {
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
      if (err.name === 'CastError') {
        return next(new BadRequestError('Не корректный _id фильма. '));
      }
      if (err.message === 'NotFound') {
        return next(new NotFoundError('Передан несуществующий _id фильма. '));
      }

      return next(err);
    });
};
