import userModel from "../model/userModel";

// login user

const loginUser = async (req, res) => {
  res.json({ msg: "login user" });
};
// signup
const signUser = async (req, res) => {
  res.json({ msg: "sign user" });
};

module.exports = { signUser, loginUser };
