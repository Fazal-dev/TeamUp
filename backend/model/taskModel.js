import mongoose from "mongoose";

const { Schema, model } = mongoose;

const TaskSchema = new Schema(
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
  },
  {
    timestamps: true,
  }
);

const task = model("task", TaskSchema);

export default task;
