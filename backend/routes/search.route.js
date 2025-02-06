import express from "express";
import {
  searchPerson,
  searchMovie,
  searchTv,
  searchHistory,
  deleteSearchHistory,
} from "../controllers/search.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Search
 *     description: Search-related endpoints (movies, TV, persons, search history)
 */

/**
 * @swagger
 * /api/v1/search/person/{query}:
 *   get:
 *     tags:
 *       - Search
 *     summary: Search for a person
 *     description: Searches for a person by name.
 *     parameters:
 *       - in: path
 *         name: query
 *         required: true
 *         description: Name of the person to search for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Search results for person
 *       404:
 *         description: No results found
 *       500:
 *         description: Internal server error
 */
router.get("/person/:query", searchPerson);

/**
 * @swagger
 * /api/v1/search/movie/{query}:
 *   get:
 *     tags:
 *       - Search
 *     summary: Search for a movie
 *     description: Searches for a movie by title.
 *     parameters:
 *       - in: path
 *         name: query
 *         required: true
 *         description: Title of the movie to search for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Search results for movie
 *       404:
 *         description: No results found
 *       500:
 *         description: Internal server error
 */
router.get("/movie/:query", searchMovie);

/**
 * @swagger
 * /api/v1/search/tv/{query}:
 *   get:
 *     tags:
 *       - Search
 *     summary: Search for a TV show
 *     description: Searches for a TV show by title.
 *     parameters:
 *       - in: path
 *         name: query
 *         required: true
 *         description: Title of the TV show to search for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Search results for TV show
 *       404:
 *         description: No results found
 *       500:
 *         description: Internal server error
 */
router.get("/tv/:query", searchTv);

/**
 * @swagger
 * /api/v1/search/history:
 *   get:
 *     tags:
 *       - Search
 *     summary: Get search history
 *     description: Fetches the search history for the authenticated user.
 *     responses:
 *       200:
 *         description: Search history found
 *       404:
 *         description: No search history found
 *       500:
 *         description: Internal server error
 */
router.get("/history", searchHistory);

/**
 * @swagger
 * /api/v1/search/history/delete/{id}:
 *   delete:
 *     tags:
 *       - Search
 *     summary: Delete search history
 *     description: Deletes a search history entry by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the search history entry to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Search history entry deleted successfully
 *       404:
 *         description: Search history entry not found
 *       500:
 *         description: Internal server error
 */
router.delete("/history/delete/:id", deleteSearchHistory);

export default router;
