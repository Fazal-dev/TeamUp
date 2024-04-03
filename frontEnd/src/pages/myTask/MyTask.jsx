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
import { useEffect, useState } from "react";
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
import TaskCards from "../../components/TaskCards";
import { deleteTask } from "../../services/taskService/index.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getToken } from "../../utility/index.js";
import Spinner from "../../components/common/Spinner.jsx";
import { useSnackbar } from "notistack";
import Swal from "sweetalert2";
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
      const response = await axios.get("http://localhost:8000/api/task", {
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

  const handleDelete = async (id) => {
    const token = getToken();
    // confrimation alert
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
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
        `http://localhost:8000/api/task/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchAllTask(token);
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

        {loading ? (
          <Spinner />
        ) : showType === "table" ? (
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
                  tasks.map((task, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{task.taskTitle}</TableCell>
                      <TableCell>{task.description}</TableCell>
                      <TableCell>{task.date}</TableCell>
                      <TableCell>{task.priority}</TableCell>
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
                            <Link
                              onClick={() => navigate(`/editTask/${task._id}`)}
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
