import React, { useEffect, useState } from "react";
import AddTaskModal from "../../Modals/AddTaskModal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteTwoToneIcon from "@mui/icons-material/EditNoteTwoTone";
import { Chip, Stack, Typography } from "@mui/material";
import { Box, Container, Paper } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSnackbar } from "notistack";
const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const { id } = useParams();
  const [projectName, setProjectName] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  // FETCH PROJECT TASKS
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
  const getUserInfo = async (token) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };
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

  useEffect(() => {
    fetchData();
    const token = localStorage.getItem("token");
    getUserInfo(token);
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
                  tasks.map((task, index) => (
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
                      <TableCell>{task.priority}</TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          variant="outlined"
                          label={task.status}
                          color={
                            task.status === "completed" ? "success" : "warning"
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Stack direction={"row"} spacing={1}>
                          <Box>
                            <Link
                              onClick={() =>
                                navigate(`/editProjectTask/${task._id}`)
                              }
                            >
                              <EditNoteTwoToneIcon />
                            </Link>
                          </Box>
                          <Box>
                            <Link
                              onClick={() => handleDelete(task._id)}
                              sx={{ color: "red" }}
                            >
                              <DeleteIcon />
                            </Link>
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
