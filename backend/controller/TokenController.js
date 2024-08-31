import jwt from "jsonwebtoken";

import Token from "../model/tokenModel.js";
const genarateAccessToken = (id) => {
  return jwt.sign(
    {
      userId: id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};
const genarateRefreshToken = (id) => {
  return jwt.sign(
    {
      userId: id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// exchange the token
export const exchangeToken = async (req, res) => {
  const { code } = req.body;

  let decoded;

  try {
    decoded = jwt.verify(code, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({ message: "Invalid authorization code" });
  }

  // create access and refresh tokens
  const accessToken = genarateAccessToken(decoded.userId);
  const refreshToken = genarateRefreshToken(decoded.userId);

  // Create a new token
  const newToken = new Token({
    accessToken,
    refreshToken,
    userId: decoded.userId,
    expiresIn: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
  });

  // Save the new tokens and respond
  try {
    await newToken.save();
    res
      .status(200)
      .json({ message: "Successfully login", accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// refresh the access token
export const refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  let decoded;

  try {
    decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res
        .status(403)
        .json({ message: "Refresh token has expired. Please log in again." });
    }
    res.status(401).json({ error: error.message });
  }

  const newAccessToken = genarateAccessToken(decoded.userId);

  try {
    Token.findOneAndUpdate(
      { refreshToken },
      { accessToken: newAccessToken },
      { new: true }
    );
    res.status(201).json({
      message: "succesfully create new access token",
      accessToken: newAccessToken,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// delete the token
export const revokeToken = async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await Token.findOneAndDelete({
      $or: [{ accessToken: token }, { refreshToken: token }],
    });

    res.status(200).json({ message: "Token revoked successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
