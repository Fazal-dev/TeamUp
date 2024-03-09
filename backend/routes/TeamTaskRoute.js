import express from "express";
import TeamTaskController from "../controller/TeamTaskController.js";

const TeamTaskRouter = express.Router();

TeamTaskRouter.post("/", TeamTaskController.createTeamTask);
TeamTaskRouter.get("/", TeamTaskController.getAllTeamTask);
TeamTaskRouter.get("/:id", TeamTaskController.getSingleTeamTask);
TeamTaskRouter.patch("/:id", TeamTaskController.updateTeamTask);
TeamTaskRouter.delete("/:id", TeamTaskController.deleteTeamTask);

export default TeamTaskRouter;
