import express from "express";
import {
  createProject,
  getAllProject,
  deleteProject,
  updateProject,
  getAllMembersInProject,
  addMemberToProject,
} from "../controller/ProjectController.js";
import { protect } from "../middleWare/authMiddleWare.js";
const ProjectRouter = express.Router();

ProjectRouter.post("/", protect, createProject);

ProjectRouter.get("/", protect, getAllProject);

// ProjectRouter.get("/:projectId/members", protect, getAllMembersInProject);

// ProjectRouter.post("/:projectId/members", protect, addMemberToProject);

// ProjectRouter.get("/:id", getSingleProjectTask);

ProjectRouter.patch("/:id", protect, updateProject);
ProjectRouter.delete("/:id", protect, deleteProject);

export default ProjectRouter;
