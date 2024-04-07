import mongoose from "mongoose";
import Project from "../model/projectModel.js";
import ProjectTask from "../model/projectTaskModel.js";
import moment from "moment";
// create a project
export const createProject = async (req, res) => {
  const { projectName, description, startDate, endDate, createdBy } = req.body;
  if (!req.user.id) {
    console.log("error catch");
  }

  try {
    const formattedStartDate = moment(startDate).utc().format("YYYY-MM-DD");
    const formattedEndDate = moment(endDate).utc().format("YYYY-MM-DD");

    const project = await Project.create({
      projectName,
      description,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      createdBy: req.user.id,
    });
    res.status(200).send(project);
    console.log(project);
  } catch (error) {
    console.error("Error creating project :", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
// getall the Project
export const getAllProject = async (req, res) => {
  try {
    const allProject = await Project.find({ createdBy: req.user.id });
    res.status(200).json(allProject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// update Project
export const updateProject = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "project not found" });
  }
  try {
    const project = await Project.findByIdAndUpdate(
      { _id: id },
      { ...req.body }
    );
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// delete Project
export const deleteProject = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "project not found" });
  }
  try {
    const project = await Project.findByIdAndDelete(id);
    // Delete project tasks associated with the deleted project
    await ProjectTask.deleteMany({ projectID: id });
    res
      .status(200)
      .json({ message: "Project and associated tasks deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
