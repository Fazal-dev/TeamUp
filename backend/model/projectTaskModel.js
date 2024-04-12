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

projectTaskSchema.set("toJSON", {
  getters: true,
});

projectTaskSchema.path("date").get(function (date) {
  return formatDate(date);
});

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}/${month}/${day}`;
};
const ProjectTask = model("ProjectTask", projectTaskSchema);

export default ProjectTask;
