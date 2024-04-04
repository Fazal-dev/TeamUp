import mongoose from "mongoose";
import userModel from "./userModel.js";
const { Schema, model } = mongoose;

const TaskSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    taskTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
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
// Define a getter function for date to format it in a human-readable format
TaskSchema.set("toJSON", {
  getters: true,
});

TaskSchema.path("date").get(function (date) {
  return formatDate(date);
});

// Function to format date to "yyyy/mm/dd" format
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}/${month}/${day}`;
};
TaskSchema.index({ status: 1, priority: 1 });
const Task = model("Task", TaskSchema);
export default Task;
