import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { json } from "express";

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(" ")[1];

      //   verfiy token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //   get user from the token
      req.user = await userModel.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "not authorize" });
    }
  }
  if (!token) {
    res.status(401), json({ message: "not authorizes no token" });
  }
});
