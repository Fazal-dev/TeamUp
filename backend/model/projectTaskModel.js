import mongoose from "mongoose";
import User from "./userModel.js";
const { Schema, model } = mongoose;

const projectTaskSchema = new Schema(
  {
    taskTitle: String,
    description: String,
    date: Date,
    status: {
      type: String,
      enum: ["completed", "incomplete"],
      default: "incomplete",
    },
    projectID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const ProjectTask = model("ProjectTask", projectTaskSchema);

export default ProjectTask;
