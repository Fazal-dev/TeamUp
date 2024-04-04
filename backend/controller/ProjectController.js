import mongoose from "mongoose";
import Project from "../model/projectModel.js";
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
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// -------------------------------------------------------
// get all members in project
export const getAllMembersInProject = async (req, res) => {
  const { projectId } = req.params; // Assuming projectId is passed in the URL params
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(404).json({ message: "Project not found" });
  }

  try {
    // Find the project by its ID and populate the 'members' field
    const project = await Project.findById(projectId).populate("members");

    // Check if project exists
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Access the populated 'members' field
    const members = project.members;
    res.status(200).json(members);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// add new member to project
export const addMemberToProject = async (req, res) => {
  const { projectId } = req.params;
  const { memberId } = req.body; // Assuming memberId is passed in the request body

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(404).json({ message: "Project not found" });
  }

  try {
    // Find the project by its ID
    const project = await Project.findById(projectId);

    // Check if project exists
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if memberId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(memberId)) {
      return res.status(400).json({ message: "Invalid member ID" });
    }

    // Check if the member is already added to the project
    if (project.members.includes(memberId)) {
      return res
        .status(400)
        .json({ message: "Member already exists in the project" });
    }

    // Push the new memberId into the 'members' array of the project
    project.members.push(memberId);

    // Save the updated project
    await project.save();

    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// remove member from project
