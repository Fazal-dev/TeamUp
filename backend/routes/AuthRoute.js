import express from "express";
import { authorize } from "../controller/AuthController";
const AuthRouter = express.Router();

AuthRouter.post("/authorize", authorize);

export default AuthRouter;
