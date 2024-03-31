import express from "express";
import { signUpUser, loginUser, getMe } from "../controller/userController.js";
import { protect } from "../middleWare/authMiddleWare.js";
const UserRouter = express.Router();

//login route
UserRouter.post("/login", loginUser);

UserRouter.get("/me", protect, getMe);

// sigup route
UserRouter.post("/", signUpUser);

export default UserRouter;
