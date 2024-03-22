import React from "react";
import TaskCard from "./TaskCard";
import { Container, Grid } from "@mui/material";

const TaskCards = () => {
  const tasks = [
    {
      title: "Complete Project Proposal",
      description:
        "Write a detailed proposal outlining project scope, objectives, and timeline.",
      due_date: "2024-04-10",
      status: "In Progress",
    },
    {
      title: "Review Codebase",
      description:
        "Review the existing codebase for potential optimizations and bugs.",
      due_date: "2024-03-25",
      status: "Pending",
    },
    {
      title: "Prepare Presentation Slides",
      description:
        "Create visually appealing slides for the upcoming project presentation.",
      due_date: "2024-04-05",
      status: "Not Started",
    },
    {
      title: "Conduct User Testing",
      description:
        "Gather feedback from target users through testing sessions.",
      due_date: "2024-04-15",
      status: "Not Started",
    },
    {
      title: "Refactor Backend Code",
      description:
        "Improve the structure and efficiency of backend code modules.",
      due_date: "2024-04-02",
      status: "In Progress",
    },
    {
      title: "Design New Logo",
      description:
        "Create a modern and visually appealing logo for the company rebranding.",
      due_date: "2024-03-28",
      status: "Completed",
    },
    {
      title: "Update Documentation",
      description:
        "Update project documentation to reflect recent changes and additions.",
      due_date: "2024-04-07",
      status: "Pending",
    },
    {
      title: "Test Application Compatibility",
      description:
        "Ensure application compatibility across different devices and browsers.",
      due_date: "2024-04-12",
      status: "Not Started",
    },
    {
      title: "Deploy New Feature Set",
      description:
        "Deploy the latest feature set to the staging environment for testing.",
      due_date: "2024-04-03",
      status: "In Progress",
    },
    {
      title: "Prepare Budget Report",
      description:
        "Compile financial data and prepare a budget report for the upcoming quarter.",
      due_date: "2024-04-08",
      status: "Pending",
    },
  ];
  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={5} pt={2}>
          {tasks.map((task, index) => (
            <Grid item xs={12} md={4} sm={4}>
              <TaskCard key={index} task={task} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default TaskCards;
