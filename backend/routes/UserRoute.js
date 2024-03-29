import express from "express";

import { signUpUser, loginUser, getMe } from "../controller/userController.js";

const UserRouter = express.Router();

//login route
UserRouter.post("/login", loginUser);

UserRouter.get("/me", getMe);

// sigup route
UserRouter.post("/", signUpUser);

export default UserRouter;
