import express from "express";

// controller
import { loginUser, signUser } from "../controller/userController";

const UserRouter = express.Router();

//login route
UserRouter.post("/login", loginUser);

// sigup route
UserRouter.post("/signup", signUser);
export default UserRouter;
