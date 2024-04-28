import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";

// GET USER DETAILS BY ID
export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    // Handle server errors
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// login user
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Check if the user exists
  const user = await userModel.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    // If user exists and password is correct, generate JWT token
    res.json({
      message: "succefully login",
      token: generateToken(user._id),
    });
  } else {
    // If user does not exist or password is incorrect, return error
    res.status(401).json({
      error:
        "Invalid email or password. Please check your credentials and try again.",
    });
  }
});

// signup user
export const signUpUser = asyncHandler(async (req, res) => {
  const { email, password, userName } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      // If email exists, return error
      return res.status(400).json({
        error: "Email already exists. Please choose a different email .",
      });
    }
    // Hash password before saving to the database
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = await userModel.create({
      email,
      password: hashPassword,
      userName,
    });

    // Respond with success message and JWT token
    res.status(201).json({
      _id: user.id,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    // Handle any errors
    console.error("Error sign up user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// get authorized user details
export const getMe = asyncHandler(async (req, res) => {
  // Get user details using the user ID from the JWT token
  const { _id, email, userName } = await userModel.findById(req.user.id);
  // Return user details
  res.status(201).send({
    id: _id,
    email,
    userName,
  });
});

// genarate jwt
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
