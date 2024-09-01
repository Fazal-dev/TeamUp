import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.Authorization ||
    req.headers.authorization ||
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(" ")[1];

      //   verfiy token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //   get user from the token
      req.user = await userModel.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }
      res.status(401).send({ message: "not authorized" });
      console.log(error.message);
    }
  }
  if (!token) {
    return res.status(401).send({ message: "not authorizes no token" });
  }
});
