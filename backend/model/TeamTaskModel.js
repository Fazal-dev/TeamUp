import mongoose from "mongoose";

const { Schema, model } = mongoose;

const teamTaskSchema = new Schema(
  {
    task_title: String,
    description: String,
    date: Date,
    assignee: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    state: String,
  },
  {
    timestamps: true,
  }
);

const TeamTask = model("TeamTask", teamTaskSchema);

export default TeamTask;
