import mongoose from "mongoose";
import User from "./userModel.js";
const { Schema, model } = mongoose;

const projectSchema = new Schema(
  {
    projectName: {
      type: String,
    },
    description: String,
    startDate: Date,
    endDate: Date,
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);
projectSchema.set("toJSON", {
  getters: true,
});

projectSchema.path("startDate").get(function (startDate) {
  return formatDate(startDate);
});

projectSchema.path("endDate").get(function (endDate) {
  return formatDate(endDate);
});
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}/${month}/${day}`;
};
const Project = model("Project", projectSchema);

export default Project;
