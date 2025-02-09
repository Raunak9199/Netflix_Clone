import express from "express";
import {
  getTrendingTvShows,
  getTvShowTrailers,
  getTvShowdetails,
  getSimilarTvShows,
  getTvShowsByCategory,
} from "../controllers/tv.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: TV Show
 *     description: TV show-related endpoints (trending, trailers, details, similar shows, categories)
 */

/**
 * @swagger
 * /api/v1/tv/trending:
 *   get:
 *     tags:
 *       - TV Show
 *     summary: Get trending TV shows
 *     description: Fetches the list of trending TV shows.
 *     responses:
 *       200:
 *         description: Trending TV show fetched successfully
 *       404:
 *         description: No trending TV shows found
 *       500:
 *         description: Internal server error
 */
router.route("/trending").get(getTrendingTvShows);

/**
 * @swagger
 * /api/v1/tv/{id}/trailers:
 *   get:
 *     tags:
 *       - TV Show
 *     summary: Get trailers for a TV show
 *     description: Fetches trailers for a specific TV show by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the TV show
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Trailer fetched successfully
 *       404:
 *         description: No trailers found for this TV show
 *       500:
 *         description: Internal server error
 */
router.route("/:id/trailers").get(getTvShowTrailers);

/**
 * @swagger
 * /api/v1/tv/{id}/details:
 *   get:
 *     tags:
 *       - TV Show
 *     summary: Get details of a TV show
 *     description: Fetches detailed information about a TV show by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the TV show
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: TV show details fetched successfully
 *       404:
 *         description: No details found for this TV show
 *       500:
 *         description: Internal server error
 */
router.route("/:id/details").get(getTvShowdetails);

/**
 * @swagger
 * /api/v1/tv/{id}/similar:
 *   get:
 *     tags:
 *       - TV Show
 *     summary: Get similar TV shows
 *     description: Fetches a list of TV shows similar to the given TV show by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the TV show
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Similar TV shows fetched successfully
 *       404:
 *         description: No similar TV shows found
 *       500:
 *         description: Internal server error
 */
router.route("/:id/similar").get(getSimilarTvShows);

/**
 * @swagger
 * /api/v1/tv/{category}:
 *   get:
 *     tags:
 *       - TV Show
 *     summary: Get TV shows by category
 *     description: Fetches a list of TV shows by a specified category.
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         description: Category of TV shows (e.g., "popular", "top_rated", etc.)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: TV shows fetched by category successfully
 *       404:
 *         description: No TV shows found in this category
 *       500:
 *         description: Internal server error
 */
router.route("/:category").get(getTvShowsByCategory);

export default router;
