import { Router } from "express";
import { createMovie, getMovies, deleteMovie } from "../controllers/movie.js";
import createMovieValidate from "../middlewares/createMovieValidate.js";
import movieObjectIdValidate from "../middlewares/movieObjectIdValidate.js";

const movieRouter = Router();

movieRouter.post("/", createMovieValidate, createMovie);
movieRouter.get("/", movieObjectIdValidate, getMovies);
movieRouter.delete("/:movieId", deleteMovie);

export default movieRouter;