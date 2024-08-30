import mongoose from "mongoose";

const { Schema, model } = mongoose;

const TokenSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    expiresIn: { type: Date, required: true },
    revoked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Token = model("Token", TokenSchema);

export default Token;
