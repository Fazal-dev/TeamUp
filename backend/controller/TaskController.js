import mongoose from "mongoose";
import Task from "../model/taskModel.js";
import userModel from "../model/userModel.js";
// create a task
export const createTask = async (req, res) => {
  const { taskTitle, description, date, status, priority } = req.body;
  try {
    // Validate input data
    if (!taskTitle || !description) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    const task = await Task.create({
      taskTitle,
      description,
      date,
      status,
      priority,
      user: req.user.id,
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
    // Find the task by ID
    const task = await Task.findById(id);

    // Check if the task exists
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if the logged-in user is authorized to update the task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    // Update the task with the request body data
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// get all the Task
export const getAllTask = async (req, res) => {
  try {
    const allTask = await Task.find({ user: req.user.id });
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
    // Find the task by ID
    const task = await Task.findById(id);

    // Check if the task exists
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if the logged-in user is authorized to delete the task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    // Delete the task
    const deletedTask = await Task.findByIdAndDelete(id);
    res.status(200).json(deletedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
