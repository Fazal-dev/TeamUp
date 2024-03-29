import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";

// login user

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({ message: "succefully login", token: generateToken(user._id) });
  } else {
    res.status(400).json({ error: "invalid user data" });
  }
});

// signup

export const signUpUser = asyncHandler(async (req, res) => {
  const { email, password, userName, userType } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    // hash pasword
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = await userModel.create({
      email,
      password: hashPassword,
      userName,
      userType: userType || "member",
    });

    // Respond with success message
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
export const getMe = asyncHandler(async (req, res) => {
  res.json({ msg: "get me" });
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// genarate jwt
