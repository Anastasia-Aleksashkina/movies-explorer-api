const moviesRouter = require('express').Router();
const { movieValid, movieIdValid } = require('../middlewares/validation');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movie');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', createMovie, movieValid);
moviesRouter.delete('/:movieId', deleteMovie, movieIdValid);

module.exports = moviesRouter;
