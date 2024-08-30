import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";

export const authorize = (req, res) => {
  const { username, password } = req.body;
  const user = userModel.findOne({ username, password });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const authorizationCode = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "10m" }
  );

  res.json({ code: authorizationCode });
};
