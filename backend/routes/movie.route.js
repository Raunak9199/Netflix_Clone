import express from "express";
import {
  getTrendingMovie,
  getMovieTrailers,
  getMoviedetails,
  getSimilarMovies,
} from "../controllers/movie.controller.js";

const router = express.Router();

router.route("/getTrendingMovie").get(getTrendingMovie);
router.route("/:id/trailers").get(getMovieTrailers);
router.route("/:id/details").get(getMoviedetails);
router.route("/:id/getSimilarMovies").get(getSimilarMovies);

export default router;
