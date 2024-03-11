import mongoose from "mongoose";
import ProjectTask from "../model/projectTaskModel.js";
// create a team task
const createProjectTask = async (req, res) => {
  const { task_title, description, date, assignee, state } = req.body;
  try {
    const task = await ProjectTask.create({
      task_title,
      description,
      date,
      assignee,
      state,
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// getall the ProjectTask
const getAllProjectTask = async (req, res) => {
  try {
    const allProjectTask = await ProjectTask.find({});
    res.status(200).json(allTeamTask);
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
// delete team task
const deleteProjectTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "task not found" });
  }
  try {
    const task = await ProjectTask.findByIdAndDelete(id);
    res.status(200).json({});
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
