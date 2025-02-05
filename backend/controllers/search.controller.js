import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import fetchTMDB from "../services/tmdb.service.js";
import { User } from "../models/user.model.js";

const searchPerson = asyncHandler(async (req, res) => {
  const { query } = req.params;
  const url = `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`;

  const response = await fetchTMDB(url);

  if (response.results?.length === 0) {
    return res.status(404).json(new ApiResponse(404, {}, "No results found"));
  }

  await User.findByIdAndUpdate(req.user?._id, {
    $push: {
      searchHistory: {
        id: response.results[0].id,
        image: response.results[0].profile_path,
        title: response.results[0].name,
        searchType: "person",
        createdAt: new Date(),
      },
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, response.results, "success"));
});
const searchMovie = asyncHandler(async (req, res) => {
  const { query } = req.params;
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

  const response = await fetchTMDB(url);

  if (response.results?.length === 0) {
    return res.status(404).json(new ApiResponse(404, {}, "No results found"));
  }

  await User.findByIdAndUpdate(req.user?._id, {
    $push: {
      searchHistory: {
        id: response.results[0].id,
        image: response.results[0].poster_path,
        title: response.results[0].title,
        searchType: "movie",
        createdAt: new Date(),
      },
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, response.results, "success"));
});
const searchTv = asyncHandler(async (req, res) => {
  const { query } = req.params;
  const url = `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`;

  const response = await fetchTMDB(url);

  if (response.results?.length === 0) {
    return res.status(404).json(new ApiResponse(404, {}, "No results found"));
  }

  await User.findByIdAndUpdate(req.user?._id, {
    $push: {
      searchHistory: {
        id: response.results[0].id,
        image: response.results[0].poster_path,
        title: response.results[0].name,
        searchType: "tv",
        createdAt: new Date(),
      },
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, response.results, "success"));
});

const searchHistory = asyncHandler(async (req, res) => {
  const history = req.user.searchHistory;

  if (history.length === 0) {
    return res
      .status(404)
      .json(new ApiResponse(404, {}, "No search history found"));
  }
  return res.status(200).json(new ApiResponse(200, history, "Success"));
});

const deleteSearchHistory = asyncHandler(async (req, res) => {
  let { id } = req.params;

  id = parseInt(id);

  await User.findByIdAndUpdate(req.user?._id, {
    $pull: {
      searchHistory: { id: id },
    },
  });

  return res.status(200).json(new ApiResponse(200, {}, "Deleted successfully"));
});

export {
  searchPerson,
  searchMovie,
  searchTv,
  searchHistory,
  deleteSearchHistory,
};
