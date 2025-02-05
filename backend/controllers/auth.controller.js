import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import { asyncHandler } from "../utils/asyncHandler.js";
export async function signup(req, res) {
  try {
    const { email, password, userName } = req.body;

    console.log("signup:", email, password, userName);

    // Check if all fields are provided
    if (!email || !password || !userName) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = (email) => emailRegex.test(email);
    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    // Password validation
    if (password.length < 5) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Username validation
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const isValidUsername = (username) => usernameRegex.test(username);
    if (!isValidUsername(userName)) {
      return res.status(400).json({
        success: false,
        message:
          "Username must contain only numbers, characters, and underscores",
      });
    }

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Check if user with the same username already exists
    const existingUserByUserName = await User.findOne({ userName: userName });
    if (existingUserByUserName) {
      return res.status(400).json({
        success: false,
        message: "User with this username already exists",
      });
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    // Assign a random profile picture
    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    // Create the new user
    const newUser = await User.create({
      email,
      userName,
      password: hashPassword,
      image,
    });

    console.log("New user created: " + newUser);

    // If user is created successfully, generate token and send response
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      const createdUser = await User.findById(newUser._id).select("-password");
      console.log("\n\ncreated user: " + createdUser);
      return res
        .status(201)
        .json(new ApiResponse(201, createdUser, "User created successfully"));
    }

    // If there was an error creating the user
    return res
      .status(500)
      .json(new ApiResponse(500, {}, "Error creating user"));
  } catch (error) {
    console.log("Error signing up: ", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate inputs
  if (!email || !password || password.trim() === "") {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "All fields are required"));
  }

  // Find the user by email
  const user = await User.findOne({ email: email });

  // Check if user exists and password is set
  if (!user || !user.password) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          {},
          "User not found or password is missing. Please check your credentials"
        )
      );
  }

  // Compare password with hashed password
  const isPasswordMatch = await bcryptjs.compare(password, user.password);

  if (!isPasswordMatch) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Invalid Credentials"));
  }

  // Generate and set token cookie
  generateTokenAndSetCookie(user._id, res);
  const loggedInUser = await User.findById(user._id).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, loggedInUser, "User logged in successfully"));
});

const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { "netflix-token": 1 }, // this removes the field from document ( 1 is used to unset a value in mongo DB),
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("netflix-token", options)
    .json(new ApiResponse(200, {}, "User logged out successfully."));
});

export { logout, login };
