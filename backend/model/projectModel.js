import mongoose from "mongoose";
import User from "./userModel.js";
const { Schema, model } = mongoose;

const projectSchema = new Schema(
  {
    projectName: { type: String, required: true },
    description: String,
    startDate: Date,
    endDate: Date,
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const Project = model("Project", projectSchema);

export default Project;
