import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

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

// routes declaration
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/movie", movieRoute);

export { app };
