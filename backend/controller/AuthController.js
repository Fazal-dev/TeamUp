import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";

export const authorize = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const authorizationCode = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "10m" }
  );

  res.status(200).json({
    redirect_URL: `${process.env.REDIRECT_URL}`,
    code: authorizationCode,
  });
};
