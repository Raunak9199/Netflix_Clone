/* import express from "express";
import authRoute from "./routes/auth.route.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config({
  path: "./.env",
});

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1/auth", authRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server listening on port: " + process.env.PORT);
  connectDB();
});

export { app };
 */

import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    console.log("Connected to database");
    app.listen(process.env.PORT || 8000, "0.0.0.0", () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed: " + err);
  });
