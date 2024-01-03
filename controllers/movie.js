import Movie from "../models/Movie";
import { NotFoundError } from "../errors/not-found-err.js";
import { ForbiddenError } from "../errors/forbidden-err.js";

export const createMovie = (req, res, next) => {
  req.body.owner = req.user._id;
  return Movie.create(req.body)
    .then((movie) => {
      res.send({ data: movie });
    })
    .catch(next);
};

export const getMovies = (req, res, next) => {
  return Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.send({ data: movies });
    })
    .catch(next);
};

export const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  return Movie.findById({_id: movieId})
  .orFail()
  .then((movie) => {
    if(movie.owner._id != req.user._id) {
      throw new ForbiddenError("Можно удалять только собственные фильмы");
    }

    return Movie.deleteOne(movie).orFail().then(() => res.send({ message: 'Фильм удален' }));
  })
  .catch((err) => {
    if(err.name === "DocumentNotFoundError") {
      return next(new NotFoundError("Фильма с данныи id не существует"));
    }

    next(err);
  })
}