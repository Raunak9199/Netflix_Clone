import express from "express";
import {
  signup,
  login,
  logout,
  isAuthenticatedUser,
} from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: Authentication-related endpoints
 */

/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: User Signup
 *     description: Allows users to sign up.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username of the user
 *               email:
 *                 type: string
 *                 description: Email of the user
 *               password:
 *                 type: string
 *                 description: Password of the user
 *     responses:
 *       200:
 *         description: User signed up successfully
 *       400:
 *         description: Bad request (missing or invalid data)
 *       500:
 *         description: Internal server error
 */
router.route("/signup").post(signup);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: User Login
 *     description: Allows users to log in.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the user
 *               password:
 *                 type: string
 *                 description: Password of the user
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Unauthorized (invalid credentials)
 *       500:
 *         description: Internal server error
 */
router.route("/login").post(login);

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: User Logout
 *     description: Logs out the user.
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       401:
 *         description: Unauthorized (invalid token)
 *       500:
 *         description: Internal server error
 */
router.route("/logout").post(isAuthenticated, logout);

/**
 * @swagger
 * /api/v1/auth/isAuthenticatedUser:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Check is user authenticated
 *     description: Returns true if iser is authenticated.
 *     responses:
 *       200:
 *         description: User is logged in
 *       401:
 *         description: Unauthorized (invalid token)
 *       500:
 *         description: Internal server error
 */
router.route("/isAuthenticatedUser").get(isAuthenticated, isAuthenticatedUser);

export default router;
