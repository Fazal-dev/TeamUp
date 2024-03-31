import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ListIcon from "@mui/icons-material/List";
import DeleteIcon from "@mui/icons-material/Delete";
import SpaceDashboardSharpIcon from "@mui/icons-material/SpaceDashboardSharp";
import EditNoteTwoToneIcon from "@mui/icons-material/EditNoteTwoTone";
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddMyTaskModal from "../../Modals/AddMyTaskModal";
import TaskCards from "../../components/TaskCards";
import { fetchAllTask, deleteTask } from "../../services/taskService/index.js";
import axios from "axios";

const MyTask = () => {
  const [tasks, setTasks] = useState([]);
  const [showType, setShowType] = useState("table");

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    // confrimation alet
    deleteTask(id, token);
    const updatedTasks = await fetchAllTask(token);
    setTasks(updatedTasks);
  };
  useEffect(() => {
    // Fetch JWT token
    const token = localStorage.getItem("token");
    // Call getAllTask with the token
    if (token) {
      fetchAllTask(token)
        .then((tasks) => {
          console.log(tasks);
          setTasks(tasks);
        })
        .catch((error) => {
          console.log("Error fetching tasks:", error.message);
        });
    }
  }, []);

  return (
    <div>
      <Container sx={{ width: "100vw" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
            mt: 3,
          }}
        >
          <Box>
            <Typography variant="h5">To Do</Typography>
          </Box>
          <Box>
            <AddMyTaskModal />
          </Box>
        </Box>

        <Stack direction={"row"} spacing={2} p={1}>
          <Box>
            <Button
              onClick={() => setShowType("table")}
              variant="text"
              startIcon={<ListIcon />}
            >
              list
            </Button>
          </Box>
          <Box>
            <Button
              onClick={() => setShowType("card")}
              variant="text"
              startIcon={<SpaceDashboardSharpIcon />}
            >
              card
            </Button>
          </Box>
          <Grid container alignItems={"center"} justifyContent={"end"}>
            <Grid
              item
              sx={{
                paddingY: 1,
                display: `${showType === "table" ? "block" : "none"}`,
              }}
            >
              <TextField
                size="small"
                id="search"
                label="Search for Task"
                variant="filled"
              />
            </Grid>
          </Grid>
        </Stack>

        {showType === "table" ? (
          <Paper elevation={2} sx={{ p: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Task Tittle</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>priority</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {tasks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography variant="subtitle1" color="textSecondary">
                        No tasks found.
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        You haven't added any tasks yet. Click the "Add Task"
                        button to get started.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  tasks.map((task, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{task.task_title}</TableCell>
                      <TableCell>{task.description}</TableCell>
                      <TableCell>{task.date}</TableCell>
                      <TableCell>{task.priority}</TableCell>
                      <TableCell>
                        <span>
                          <Chip
                            size="small"
                            label={task.status}
                            color={
                              task.status === "complete" ? "success" : "warning"
                            }
                          />
                        </span>
                      </TableCell>

                      <TableCell>
                        <Stack direction={"row"} spacing={1}>
                          <Box>
                            <Link>
                              <EditNoteTwoToneIcon />
                            </Link>
                          </Box>
                          <Box>
                            <Button onClick={() => handleDelete(task._id)}>
                              <Link sx={{ color: "red" }}>
                                <DeleteIcon />
                              </Link>
                            </Button>
                          </Box>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Paper>
        ) : (
          <div>
            <TaskCards tasks={tasks} />
          </div>
        )}
      </Container>
    </div>
  );
};

export default MyTask;
