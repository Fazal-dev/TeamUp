import TeamTask from "../model/TeamTaskModel";

const createTeamTask = async (req, res) => {
  const { task_title, description, date, assignee, state } = req.body;
  try {
    const task = await TeamTask.create({
      task_title,
      description,
      date,
      assignee,
      state,
    });

    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createTeamTask };
