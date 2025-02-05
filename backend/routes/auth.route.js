import express from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(isAuthenticated, logout);
router.get("/", (req, res) => {
  res.send("Hii");
});

export default router;
