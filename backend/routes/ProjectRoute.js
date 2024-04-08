import express from "express";
import {
  createProject,
  getAllProject,
  deleteProject,
  updateProject,
  getProject,
} from "../controller/ProjectController.js";
import { protect } from "../middleWare/authMiddleWare.js";
const ProjectRouter = express.Router();

ProjectRouter.post("/", protect, createProject);
ProjectRouter.get("/", protect, getAllProject);
ProjectRouter.get("/:id", protect, getProject);
ProjectRouter.patch("/:id", protect, updateProject);
ProjectRouter.delete("/:id", protect, deleteProject);

export default ProjectRouter;
