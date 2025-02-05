import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { isAuthenticated } from "./middleware/isAuthenticated.js";

const app = express();

/* app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
); */

app.use(
  cors({
    origin: [
      process.env.CORS_ORIGIN,
      // "https://api.themoviedb.org",
      // "https://image.tmdb.org",
    ],
    // origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// app.use(express.static("public"));
app.use(cookieParser());

// routes import
import authRoute from "./routes/auth.route.js";
import movieRoute from "./routes/movie.route.js";
import tvRoute from "./routes/tv.route.js";
import searchRoute from "./routes/search.route.js";

// routes declaration
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/movie", isAuthenticated, movieRoute);
app.use("/api/v1/tv", isAuthenticated, tvRoute);
app.use("/api/v1/search", isAuthenticated, searchRoute);

export { app };
