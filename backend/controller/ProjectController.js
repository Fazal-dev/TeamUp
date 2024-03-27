import mongoose from "mongoose";
import Project from "../model/projectModel.js";
// create a project
export const createProject = async (req, res) => {
  const { projectName, description, startDate, endDate, createdBy } = req.body;
  try {
    // Validate input data
    if (!projectName || !description || !startDate || !endDate || !createdBy) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    const project = await Project.create({
      projectName,
      description,
      startDate,
      endDate,
      createdBy,
    });
    res.status(200).json(project);
    console.log(project);
  } catch (error) {
    console.error("Error creating project :", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
// getall the Project
export const getAllProject = async (req, res) => {
  try {
    const allProject = await Project.find({});
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
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
