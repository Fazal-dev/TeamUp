import express from "express";
import {
  createProject,
  getAllProject,
  deleteProject,
  updateProject,
  getAllMembersInProject,
  addMemberToProject,
} from "../controller/ProjectController.js";

const ProjectRouter = express.Router();

ProjectRouter.post("/", createProject);

ProjectRouter.get("/", getAllProject);

ProjectRouter.get("/:projectId/members", getAllMembersInProject);

ProjectRouter.post("/:projectId/members", addMemberToProject);

// ProjectRouter.get("/:id", getSingleProjectTask);

ProjectRouter.patch("/:id", updateProject);
ProjectRouter.delete("/:id", deleteProject);

export default ProjectRouter;
