import { Router } from "express";
import { createMovie, getMovies, deleteMovie } from "../controllers/movie";
import createMovieValidate from "../middlewares/createMovieValidate";
import movieObjectIdValidate from "../middlewares/movieObjectIdValidate";

const movieRouter = Router();

movieRouter.post("/", createMovieValidate, createMovie);
movieRouter.get("/", movieObjectIdValidate, getMovies);
movieRouter.delete("/:movieId", deleteMovie);

export default movieRouter;