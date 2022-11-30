const moviesRouter = require('express').Router();
const { movieValid, movieIdValid } = require('../middlewares/validation');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movie');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', movieValid, createMovie);
moviesRouter.delete('/:movieId', movieIdValid, deleteMovie);

module.exports = moviesRouter;
