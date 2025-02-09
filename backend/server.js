import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import path from "path";
import express from "express";

dotenv.config({
  path: "./.env",
});

const __dirname = path.resolve();

/* if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname, "/frontend/dist"));
}

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
}); */

connectDB()
  .then(() => {
    console.log("Connected to database");

    // Serve Frontend in Production
    if (process.env.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname, "frontend", "dist")));

      app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
      });
    }

    app.listen(process.env.PORT || 8000, "0.0.0.0", () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed: " + err);
  });
