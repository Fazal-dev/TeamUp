import mongoose from "mongoose";
import Task from "../model/taskModel.js";
// create a task
export const createTask = async (req, res) => {
  const { task_title, description, date, status, priority } = req.body;
  try {
    // Validate input data
    if (!task_title || !description || !date || !priority || !status) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    const task = await Task.create({
      task_title,
      description,
      date,
      status,
      priority,
    });
    res.status(200).json(task);
    console.log(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
// update Task
export const updateTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "task not found" });
  }
  try {
    const task = await Task.findByIdAndUpdate({ _id: id }, { ...req.body });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// get all the Task
export const getAllTask = async (req, res) => {
  try {
    const allTask = await Task.find({});
    res.status(200).json(allTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// delete Task
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "task not found" });
  }
  try {
    const task = await Task.findByIdAndDelete(id);
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
