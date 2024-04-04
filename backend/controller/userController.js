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
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// login user

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      message: "succefully login",
      userType: user.userType,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ error: "invalid user data" });
  }
});

// signup user

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
// get authorized user id
export const getMe = asyncHandler(async (req, res) => {
  const { _id, email, userType, userName } = await userModel.findById(
    req.user.id
  );
  res.status(201).send({
    id: _id,
    email,
    userType,
    userName,
  });
});

// genarate jwt
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
