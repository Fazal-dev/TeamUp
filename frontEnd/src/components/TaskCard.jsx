import { Card, Grid, Link, Stack } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";
import Chip from "@mui/material/Chip";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { deleteTask } from "../services/taskService/index.js";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const TaskCard = ({ task }) => {
  const navigate = useNavigate();
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // DELETE TASK
        deleteTask(id, token).then(() => {
          Swal.fire({
            title: "Deleted!",
            text: "Your task has been deleted.",
            icon: "success",
          });
        });
      }
    });
  };
  return (
    <>
      <Card
        sx={{
          maxWidth: 340,
          p: 1,
          borderRight: `4px solid ${
            task.status === "completed" ? "#5cb85c" : "#ff4545"
          }`,
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
            }}
            gutterBottom
          >
            {task.taskTitle}
          </Typography>
          <Typography
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
            color="text.secondary"
            gutterBottom
          >
            {task.description}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            {task.date}
          </Typography>
        </CardContent>
        <CardActions>
          <Grid
            container
            spacing={5}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Grid item>
              <Typography color="text.secondary" gutterBottom>
                <Chip
                  size="small"
                  variant="outlined"
                  label={task.status}
                  color={task.status === "completed" ? "success" : "warning"}
                />
              </Typography>
            </Grid>
            <Grid item>
              <Stack direction={"row"} spacing={3}>
                <Grid>
                  <Link
                    onClick={() => handleDelete(task._id)}
                    sx={{ color: "orange" }}
                  >
                    <DeleteForeverIcon />
                  </Link>
                </Grid>
                <Grid>
                  <Link onClick={() => navigate(`/editTask/${task._id}`)}>
                    <BorderColorIcon />
                  </Link>
                </Grid>
              </Stack>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </>
  );
};

export default TaskCard;
