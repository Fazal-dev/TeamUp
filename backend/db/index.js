import mongoose from "mongoose";
export const dbConnection = async () => {
  const DB_URL = "mongodb://127.0.0.1:27017/TeamUp";
  try {
    await mongoose.connect(DB_URL, {});
    console.log("CONNECTED TO DATABASE SUCCESSFULLY");
  } catch (error) {
    console.error("COULD NOT CONNECT TO DATABASE:", error.message);
  }
};
