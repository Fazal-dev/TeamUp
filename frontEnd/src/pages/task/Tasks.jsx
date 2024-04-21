import React, { useEffect, useState } from "react";
import AddTaskModal from "../../Modals/AddTaskModal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Chip, Stack, Tooltip, Typography } from "@mui/material";
import { Box, Container, Paper } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useSnackbar } from "notistack";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import EditNoteTwoToneIcon from "@mui/icons-material/EditNoteTwoTone";
const Tasks = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const { id } = useParams();
  const [projectName, setProjectName] = useState("");

  // fetch project task
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/projectTask/${id}`
      );
      setTasks(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching project task information:", error.message);
    }
  };

  // delete the task
  const deleteTask = (id) => {
    try {
      axios
        .delete(`http://localhost:8000/api/projectTask/${id}`)
        .then((res) => {
          console.log(res.data);
        });
    } catch (error) {
      console.log("error when delete" + error.message);
    }
  };

  // handle delete the task
  const handleDelete = async (id) => {
    try {
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
          deleteTask(id);
          setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
          enqueueSnackbar("Task deleted successfully ", {
            variant: "success",
            autoHideDuration: 5000,
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        }
      });
    } catch (error) {
      console.log("error delete the task:", error.message);
    }
  };
  // handle status update
  const handleStatus = async (id, status) => {
    // toggle the status
    const newStatus = status === "completed" ? "incomplete" : "completed";
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/projectTask/${id}`,
        { status: newStatus }
      );
      fetchData();
      enqueueSnackbar("succefully update a project task status", {
        variant: "success",
        autoHideDuration: "10",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      console.log(res.data);
    } catch (error) {
      console.log("Error fetching tasks:", error.message);
    }
  };
  // fetch project name
  const fetchProjctName = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:8000/api/project/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProjectName(res.data.projectName);
      })
      .catch((error) => {
        alert("An error happened, please check console");
        console.error("Error fetching project information:", error.message);
      });
  };
  //set color for priorty
  const getColorForPriority = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "default";
    }
  };
  // Function to sort tasks based on priority and status
  const sortTasks = (tasks) => {
    const sortedTasks = tasks.sort((a, b) => {
      const priorityOrder = {
        high: 1,
        medium: 2,
        low: 3,
      };
      const priorityComparison =
        priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityComparison !== 0) {
        return priorityComparison;
      }

      const statusOrder = {
        completed: 1,
        incomplete: 2,
      };
      return statusOrder[a.status] - statusOrder[b.status];
    });

    return sortedTasks;
  };

  useEffect(() => {
    fetchData();
    fetchProjctName();
  }, []);

  return (
    <div>
      <Container sx={{ width: "100vw" }}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 5,
              mt: 5,
            }}
          >
            <Box>
              <Typography variant="h5">
                <b>Project Name :</b>{" "}
                {projectName.charAt(0).toUpperCase() +
                  projectName.slice(1).toLowerCase()}
              </Typography>
            </Box>
            <Box>
              {tasks.length > 0 && ( // Check if there are tasks available
                <Button
                  sx={{ mr: 2 }}
                  variant="outlined"
                  onClick={() => navigate(`/ProjectDashboard/${id}`)}
                  startIcon={<DashboardCustomizeIcon />}
                >
                  Project Dashboard
                </Button>
              )}

              <AddTaskModal projectID={id} setTasks={setTasks} />
            </Box>
          </Box>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No Task</TableCell>
                  <TableCell>Task Tittle</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>priority</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {tasks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} sx={{ textAlign: "center" }}>
                      <Typography variant="subtitle1" color="textSecondary">
                        No tasks found.
                      </Typography>
                      <Typography variant="body2" color="textSecondary" mt={2}>
                        Get organized by adding some tasks! You can create new
                        tasks using add new task button.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  sortTasks(tasks).map((task, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{task.taskTitle}</TableCell>
                      <TableCell>{task.description}</TableCell>
                      <TableCell>{task.date}</TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          label={task.priority}
                          color={getColorForPriority(task.priority)}
                        />
                      </TableCell>
                      <TableCell>
                        <span
                          onClick={() => handleStatus(task._id, task.status)}
                        >
                          <Chip
                            size="small"
                            variant="outlined"
                            label={task.status}
                            color={
                              task.status === "completed"
                                ? "success"
                                : "warning"
                            }
                          />
                        </span>
                      </TableCell>
                      <TableCell>
                        <Stack direction={"row"} spacing={1}>
                          <Box>
                            <Tooltip title="Edit Task">
                              <Link
                                onClick={() =>
                                  navigate(`/editProjectTask/${task._id}/${id}`)
                                }
                              >
                                <EditNoteTwoToneIcon />
                              </Link>
                            </Tooltip>
                          </Box>
                          <Box>
                            <Tooltip title="Delete Task">
                              <Link onClick={() => handleDelete(task._id)}>
                                <DeleteIcon sx={{ color: "red" }} />
                              </Link>
                            </Tooltip>
                          </Box>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Paper>
        </Box>
      </Container>
    </div>
  );
};

export default Tasks;
