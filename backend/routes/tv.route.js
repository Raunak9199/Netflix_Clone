import express from "express";

import {
  getTrendingTvShows,
  getTvShowTrailers,
  getTvShowdetails,
  getSimilarTvShows,
  getTvShowsByCategory,
} from "../controllers/tv.controller.js";

const router = express.Router();

router.route("/getTrendingTvShows").get(getTrendingTvShows);
router.route("/:id/trailers").get(getTvShowTrailers);
router.route("/:id/details").get(getTvShowdetails);
router.route("/:id/getSimilarTvShows").get(getSimilarTvShows);
router.route("/:category").get(getTvShowsByCategory);

export default router;
