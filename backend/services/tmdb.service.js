import { asyncHandler } from "../utils/asyncHandler.js";
import axios from "axios";

const fetchTMDB = async (url) => {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    };

    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error("TMDB Error Details:", {
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
    });
    throw new Error(error.response?.data?.message || "TMDB API request failed");
  }
};

export default fetchTMDB;
