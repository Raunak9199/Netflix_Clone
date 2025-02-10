import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import swaggerUi from "swagger-ui-express"; // Import Swagger UI
import swaggerJsdoc from "swagger-jsdoc";

import { isAuthenticated } from "./middleware/isAuthenticated.js";

const app = express();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node.js API Netflix",
      version: "1.0.0",
      description:
        "This is a sample Node.js Express API documentation for Netflix Clone",
    },
    servers: [
      {
        url: "https://netflix-clone-1-d1el.onrender.com",
        // url: "http://localhost:8000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
      "http://localhost:5173",
      "http://localhost:8000",
    ],
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

//http://localhost:8000/docs/#/     -> Swagger documentation
//https://netflix-clone-1-d1el.onrender.com/docs/#/     -> Swagger documentation
