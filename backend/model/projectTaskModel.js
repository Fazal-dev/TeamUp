import mongoose from "mongoose";

const { Schema, model } = mongoose;

const projectTaskSchema = new Schema(
  {
    task_title: String,
    description: String,
    date: Date,
    assignee: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["completed", "uncompleted"],
      default: "uncompleted",
    },
    projectID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const ProjectTask = model("ProjectTask", projectTaskSchema);

export default ProjectTask;
