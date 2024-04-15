import express from "express";
import {
  createProjectTask,
  getAllProjectTask,
  getSingleProjectTask,
  updateProjectTask,
  deleteProjectTask,
} from "../controller/ProjectTaskController.js";

const ProjectTaskRouter = express.Router();

ProjectTaskRouter.post("/", createProjectTask);
ProjectTaskRouter.get("/:id", getAllProjectTask);
ProjectTaskRouter.get("/task/:taskId", getSingleProjectTask);
ProjectTaskRouter.patch("/:id", updateProjectTask);
ProjectTaskRouter.delete("/:id", deleteProjectTask);

export default ProjectTaskRouter;
