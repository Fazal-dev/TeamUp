import express from "express";
import ProjectTaskController from "../controller/ProjectTaskController.js";

const ProjectTaskRouter = express.Router();

ProjectTaskRouter.post("/", ProjectTaskController.createProjectTask);
ProjectTaskRouter.get("/", ProjectTaskController.getAllProjectTask);
ProjectTaskRouter.get("/:id", ProjectTaskController.getSingleProjectTask);
ProjectTaskRouter.patch("/:id", ProjectTaskController.updateProjectTask);
ProjectTaskRouter.delete("/:id", ProjectTaskController.deleteProjectTask);

export default ProjectTaskRouter;
