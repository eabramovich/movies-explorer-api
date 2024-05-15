import Movie from '../models/Movie.js';
import NotFoundError from '../errors/not-found-err.js';
import ForbiddenError from '../errors/forbidden-err.js';
import ValidationError from '../errors/validation-error.js';
import CastError from '../errors/cast-error.js';

export const createMovie = (req, res, next) => {
  req.body.owner = req.user._id;
  return Movie.create(req.body)
    .then((movie) => {
      res.send({ data: movie });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError(err.message));
      }

      return next(err);
    });
};

export const getMovies = (req, res, next) => {
  const owner = req.user._id;
  return Movie.find({ owner })
    .then((movies) => {
      res.send({ data: movies });
    })
    .catch(next);
};

export const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  return Movie.findById({ _id: movieId })
    .orFail()
    .then((movie) => {
      if (movie.owner._id.toString() !== req.user._id) {
        throw new ForbiddenError('Можно удалять только собственные фильмы');
      }

      return Movie.deleteOne(movie).orFail().then(() => res.send({ message: 'Фильм удален' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new CastError('Передан невалидный id'));
      }
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('Фильм с данным id не найден'));
      }

      return next(err);
    });
};
