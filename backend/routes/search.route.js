import express from "express";

import {
  searchPerson,
  searchMovie,
  searchTv,
  searchHistory,
  deleteSearchHistory,
} from "../controllers/search.controller.js";

const router = express.Router();

router.get("/person/:query", searchPerson);
router.get("/movie/:query", searchMovie);
router.get("/tv/:query", searchTv);

// Search History
router.get("/history", searchHistory);
router.delete("/history/delete/:id", deleteSearchHistory);

export default router;
