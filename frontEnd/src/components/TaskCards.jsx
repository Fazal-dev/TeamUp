import React from "react";
import TaskCard from "./TaskCard";
import { Button, Grid, Typography } from "@mui/material";

const TaskCards = ({ tasks }) => {
  return (
    <>
      <Grid container spacing={5} pt={2}>
        {tasks === null || tasks.length === 0 ? (
          <Grid
            container
            alignItems={"center"}
            justifyContent={"center"}
            textAlign={"center"}
            sx={{ height: "50vh" }}
          >
            <Grid item>
              <Typography variant="subtitle1" color="textSecondary">
                No tasks found.
              </Typography>
              <Typography variant="body2" color="textSecondary" mt={2}>
                You haven't added any tasks yet. Get started by clicking the
                button to add a new task.
              </Typography>
            </Grid>
          </Grid>
        ) : (
          tasks.map((task, index) => (
            <Grid key={index} item xs={12} md={4} sm={4}>
              <TaskCard task={task} />
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};

export default TaskCards;
