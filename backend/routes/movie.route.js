import express from "express";
import {
  getTrendingMovie,
  getMovieTrailers,
  getMoviedetails,
  getSimilarMovies,
  getMoviesByCategory,
} from "../controllers/movie.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Movies
 *     description: Movie-related endpoints
 */

/**
 * @swagger
 * /api/v1/movie/getTrendingMovie:
 *   get:
 *     tags:
 *       - Movies
 *     summary: Get Trending Movie
 *     description: Fetches a random trending movie.
 *     responses:
 *       200:
 *         description: A random trending movie fetched successfully
 *       404:
 *         description: No trending movies found
 *       500:
 *         description: Internal server error
 */
router.route("/getTrendingMovie").get(getTrendingMovie);

/**
 * @swagger
 * /api/v1/movie/{id}/trailers:
 *   get:
 *     tags:
 *       - Movies
 *     summary: Get Movie Trailers
 *     description: Fetches trailers for a specific movie.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the movie
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Trailers for the movie
 *       404:
 *         description: No trailer found
 *       500:
 *         description: Internal server error
 */
router.route("/:id/trailers").get(getMovieTrailers);

/**
 * @swagger
 * /api/v1/movie/{id}/details:
 *   get:
 *     tags:
 *       - Movies
 *     summary: Get Movie Details
 *     description: Fetches details of a specific movie by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the movie
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Details of the movie
 *       404:
 *         description: No details found
 *       500:
 *         description: Internal server error
 */
router.route("/:id/details").get(getMoviedetails);

/**
 * @swagger
 * /api/v1/movie/{id}/getSimilarMovies:
 *   get:
 *     tags:
 *       - Movies
 *     summary: Get Similar Movies
 *     description: Fetches movies similar to the specified movie ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the movie
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Similar movies for the specified movie
 *       404:
 *         description: No similar movies found
 *       500:
 *         description: Internal server error
 */
router.route("/:id/getSimilarMovies").get(getSimilarMovies);

/**
 * @swagger
 * /api/v1/movie/{category}:
 *   get:
 *     tags:
 *       - Movies
 *     summary: Get Movies by Category
 *     description: Fetches movies from a specific category (e.g., "popular", "now_playing").
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         description: The category of movies to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movies in the specified category
 *       404:
 *         description: No movies found in the specified category
 *       500:
 *         description: Internal server error
 */
router.route("/:category").get(getMoviesByCategory);

export default router;
