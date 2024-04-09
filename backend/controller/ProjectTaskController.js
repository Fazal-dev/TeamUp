import mongoose from "mongoose";
import ProjectTask from "../model/projectTaskModel.js";
import Project from "../model/projectModel.js";
// create a project task
export const createProjectTask = async (req, res) => {
  const { taskTitle, description, date, status, projectID } = req.body;
  try {
    const task = await ProjectTask.create({
      taskTitle,
      description,
      date,
      status,
      projectID,
    });
    res.status(200).json(task);
    console.log(task);
  } catch (error) {
    console.error("Error creating project task:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
// getall the Project Task
export const getAllProjectTask = async (req, res) => {
  try {
    const { id } = req.params;
    const allProjectTask = await ProjectTask.find({ projectID: id });
    res.status(200).json(allProjectTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// get single Project Task
export const getSingleProjectTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "task not found" });
  }

  try {
    const singleTask = await ProjectTask.findById(id);
    res.status(200).json(singleTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// update Project Task
export const updateProjectTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "task not found" });
  }
  try {
    const task = await ProjectTask.findByIdAndUpdate(
      { _id: id },
      { ...req.body }
    );
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// delete Project Task
export const deleteProjectTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "task not found" });
  }
  try {
    const task = await ProjectTask.findByIdAndDelete(id);
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
