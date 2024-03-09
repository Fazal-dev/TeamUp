import mongoose from "mongoose";
import TeamTask from "../model/TeamTaskModel.js";
// create a team task
const createTeamTask = async (req, res) => {
  const { task_title, description, date, assignee, state } = req.body;
  try {
    const task = await TeamTask.create({
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
// getall the team task
const getAllTeamTask = async (req, res) => {
  try {
    const allTeamTask = await TeamTask.find({});
    res.status(200).json(allTeamTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// get single team task
const getSingleTeamTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "task not found" });
  }

  try {
    const singleTask = await TeamTask.findById(id);
    res.status(200).json(singleTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// update teamtask
const updateTeamTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "task not found" });
  }
  try {
    const task = await TeamTask.findByIdAndUpdate({ _id: id }, { ...req.body });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// delete team task
const deleteTeamTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "task not found" });
  }
  try {
    const task = await TeamTask.findByIdAndDelete(id);
    res.status(200).json({});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export default {
  createTeamTask,
  getAllTeamTask,
  getSingleTeamTask,
  updateTeamTask,
  deleteTeamTask,
};
