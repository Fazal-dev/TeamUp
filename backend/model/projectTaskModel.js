import mongoose from "mongoose";
import User from "./userModel.js";
import Project from "./projectModel.js";
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
    priority: {
      type: String,
      enum: ["high", "medium", "low"],
      default: "low",
    },
    projectID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  },
  {
    timestamps: true,
  }
);

const ProjectTask = model("ProjectTask", projectTaskSchema);

export default ProjectTask;
