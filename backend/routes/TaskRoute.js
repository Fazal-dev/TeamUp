import express from "express";
import {
  createTask,
  updateTask,
  getAllTask,
  deleteTask,
  getTask,
} from "../controller/TaskController.js";
import { protect } from "../middleWare/authMiddleWare.js";

const TaskRouter = express.Router();

TaskRouter.post("/", protect, createTask);
TaskRouter.get("/", protect, getAllTask);
TaskRouter.patch("/:id", protect, updateTask);
TaskRouter.delete("/:id", protect, deleteTask);
TaskRouter.get("/:id", protect, getTask);

export default TaskRouter;
