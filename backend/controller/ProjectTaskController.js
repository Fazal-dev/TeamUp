import mongoose from "mongoose";
import ProjectTask from "../model/projectTaskModel.js";
import Project from "../model/projectModel.js";
// create a team task
const createProjectTask = async (req, res) => {
  const { task_title, description, date, assignedTo, status, projectID } =
    req.body;
  try {
    // Validate input data
    if (!task_title || !description || !date || !assignedTo || !status) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    const task = await ProjectTask.create({
      task_title,
      description,
      date,
      assignedTo,
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
// getall the ProjectTask
const getAllProjectTask = async (req, res) => {
  try {
    const allProjectTask = await ProjectTask.find({});
    res.status(200).json(allProjectTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// get single ProjectTask
const getSingleProjectTask = async (req, res) => {
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
// update ProjectTask
const updateProjectTask = async (req, res) => {
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
// delete ProjectTask
const deleteProjectTask = async (req, res) => {
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
export default {
  createProjectTask,
  getAllProjectTask,
  getSingleProjectTask,
  updateProjectTask,
  deleteProjectTask,
};
