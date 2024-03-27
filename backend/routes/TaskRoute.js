import express from "express";
import {
  createTask,
  updateTask,
  getAllTask,
  deleteTask,
} from "../controller/TaskController.js";

const TaskRouter = express.Router();

TaskRouter.post("/", createTask);
TaskRouter.get("/", getAllTask);
TaskRouter.patch("/:id", updateTask);
TaskRouter.delete("/:id", deleteTask);

export default TaskRouter;
