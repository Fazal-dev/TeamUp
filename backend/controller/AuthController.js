import jwt from "jsonwebtoken";
import userModel from "../model/userModel";

export const authorize = (req, res) => {
  const { username, password } = req.body;
  userModel.findOne({ username, password }, (err, user) => {
    if (err || !user)
      return res.status(401).json({ message: "Invalid credentials" });

    const authorizationCode = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );
    res.json({ code: authorizationCode });
  });
};
