import fetchTMDB from "../services/tmdb.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getTrendingMovie = asyncHandler(async (req, res) => {
  try {
    const data = await fetchTMDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );

    if (!data?.results) {
      return res.status(404).json({
        success: false,
        message: "No trending movies found",
      });
    }

    const randomMovie =
      data.results[Math.floor(Math.random() * data.results.length)];

    return res.status(200).json({
      success: true,
      content: randomMovie,
      message: "Trending movie fetched successfully",
    });
  } catch (error) {
    console.error("Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch trending movies",
    });
  }
});

const getMovieTrailers = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;

    const data = await fetchTMDB(url);

    if (!data?.results) {
      return res.status(404).json({
        success: false,
        message: "No trailer found",
      });
    }

    return res.status(200).json({
      success: true,
      content: data?.results,
      message: "Trending movie fetched successfully",
    });
  } catch (error) {
    console.log("Error in trailer:", error);
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

const getMoviedetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;

  const data = await fetchTMDB(url);

  if (!data) {
    return res.status(404).json({
      success: false,
      message: "No details found",
    });
  }

  return res.status(200).json({
    success: true,
    content: data,
    message: "Movie details fetched successfully",
  });
});
const getSimilarMovies = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const url = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`;

  const data = await fetchTMDB(url);

  if (!data || !data?.results) {
    return res.status(404).json({
      success: false,
      message: "No data found",
    });
  }

  return res.status(200).json({
    success: true,
    similar: data?.results,
    message: "fetched successfully",
  });
});
const getMoviesByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const url = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`;

  const data = await fetchTMDB(url);

  if (!data || !data?.results) {
    return res.status(404).json({
      success: false,
      message: "No data found",
    });
  }

  return res.status(200).json({
    success: true,
    similar: data?.results,
    message: "fetched successfully",
  });
});

export {
  getTrendingMovie,
  getMovieTrailers,
  getMoviedetails,
  getSimilarMovies,
  getMoviesByCategory,
};
