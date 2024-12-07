import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ListIcon from "@mui/icons-material/List";
import DeleteIcon from "@mui/icons-material/Delete";
import SpaceDashboardSharpIcon from "@mui/icons-material/SpaceDashboardSharp";
import EditNoteTwoToneIcon from "@mui/icons-material/EditNoteTwoTone";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";

import TaskCards from "../../components/TaskCards";
import { deleteTask } from "../../services/taskService/index.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getToken } from "../../utility/index.js";
import Spinner from "../../components/common/Spinner.jsx";
import { useSnackbar } from "notistack";
import Swal from "sweetalert2";
import environment from "../../../envirment.js";

const MyTask = () => {
  // all the states
  const [tasks, setTasks] = useState([]);
  const [showType, setShowType] = useState("table");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // Fetch JWT token
  const token = getToken();

  const fetchAllTask = async (token) => {
    try {
      const response = await axios.get(`${environment.baseUrl}/api/task`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchAllTask(token);
  }, []);
  const sortTasks = (tasks) => {
    // First, filter out high priority tasks
    const highPriorityTasks = tasks.filter((task) => task.priority === "high");

    // Sort high priority tasks alphabetically by task title
    highPriorityTasks.sort((a, b) => a.taskTitle.localeCompare(b.taskTitle));

    // Then, filter out non-high priority tasks
    const otherTasks = tasks.filter((task) => task.priority !== "high");

    // Combine high priority tasks and other tasks
    const sortedTasks = [...highPriorityTasks, ...otherTasks];

    return sortedTasks;
  };

  const handleDelete = async (id) => {
    const token = getToken();
    // confrimation alert
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
          fetchAllTask(token);
        });
      }
    });
  };

  // update status
  const handleStatus = async (id, status) => {
    // toggle the status
    const newStatus = status === "completed" ? "incomplete" : "completed";
    try {
      const res = await axios.patch(
        `${environment.baseUrl}/api/task/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchAllTask(token);
      sortTasks(tasks);
      enqueueSnackbar("succefully update a task status", {
        variant: "success",
        autoHideDuration: "10",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      console.log(res.data);
    } catch (error) {
      console.log("Error fetching tasks:", error.message);
    }
  };
  // Define priority colors mapping
  const priorityColors = {
    high: "error",
    medium: "warning",
    low: "info",
  };
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
            <Button
              onClick={() => navigate("/addTask")}
              variant="contained"
              startIcon={<AddIcon />}
            >
              Add new task
            </Button>
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
        </Stack>

        {loading ? (
          <Spinner />
        ) : showType === "table" ? (
          <Paper elevation={2} sx={{ p: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No Task</TableCell>
                  <TableCell>Task Tittle</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>priority</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {tasks === null || tasks.length === 0 ? (
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
                  sortTasks(tasks).map((task, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{task.taskTitle}</TableCell>
                      <TableCell>{task.description}</TableCell>
                      <TableCell>
                        <span>
                          <Chip
                            color={priorityColors[task.priority]}
                            size="small"
                            label={task.priority}
                          />
                        </span>
                      </TableCell>
                      <TableCell>{task.date}</TableCell>
                      <TableCell>
                        <span
                          onClick={() => handleStatus(task._id, task.status)}
                        >
                          <Chip
                            size="small"
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
                            <Tooltip title="edit task">
                              <Link
                                onClick={() =>
                                  navigate(`/editTask/${task._id}`)
                                }
                              >
                                <EditNoteTwoToneIcon />
                              </Link>
                            </Tooltip>
                          </Box>
                          <Box>
                            <Tooltip title="delete task">
                              <Link
                                onClick={() => handleDelete(task._id)}
                                sx={{ color: "red" }}
                              >
                                <DeleteIcon />
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
