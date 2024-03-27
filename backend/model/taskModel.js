import mongoose from "mongoose";
import User from "./userModel.js";
const { Schema, model } = mongoose;

const TaskSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    task_title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
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
  },
  {
    timestamps: true,
  }
);
TaskSchema.index({ status: 1, priority: 1 });
const Task = model("Task", TaskSchema);
export default Task;
