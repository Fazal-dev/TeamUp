import React from "react";
import TaskCard from "./TaskCard";
import { Grid } from "@mui/material";

const TaskCards = ({ tasks }) => {
  return (
    <>
      <Grid container spacing={5} pt={2}>
        {tasks.map((task, index) => (
          <Grid key={index} item xs={12} md={4} sm={4}>
            <TaskCard task={task} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default TaskCards;
