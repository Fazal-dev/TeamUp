import { useEffect, useState } from "react";
import {
  Button,
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import environment from "../../../envirment";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [user, setUser] = useState({});
  const [taskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  // UPDATE TASK
  const updateTask = async (updatedFormData) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `${environment.baseUrl}/api/task/${id}`,
        updatedFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error updating task:", error.message);
    }
  };
  // GET USER INFOR
  const getUserInfo = async (token) => {
    try {
      const response = await axios.get(`${environment.baseUrl}/api/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    getUserInfo(token);

    axios
      .get(`${environment.baseUrl}/api/task/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTaskTitle(res.data.taskTitle);
        setDescription(res.data.description);
        setPriority(res.data.priority);
        setStatus(res.data.status);
      })
      .catch((error) => {
        alert("An error happened, please check console");
        console.error("Error fetching task information:", error.message);
      });
  }, []);

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      taskTitle,
      description,
      priority,
      status,
      user: user.id,
    };

    updateTask(updatedFormData);
    enqueueSnackbar("Successfully updated a task ", {
      variant: "success",
      autoHideDuration: 3000,
      anchorOrigin: { vertical: "top", horizontal: "right" },
    });
    navigate("/MyTasks");
    setDescription("");
    setTaskTitle("");
    setPriority("");
    setStatus("");
  };

  return (
    <Paper sx={{ p: 10 }}>
      <form onSubmit={(e) => handleOnSubmit(e)}>
        <Box sx={{ m: 2 }}>
          <Typography variant="h5">Update Task</Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            required
            label="Task title"
            name="taskTitle"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            size="small"
            fullWidth
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            required
            label="Description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            size="small"
            fullWidth
          />
        </Box>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="status-select-label">Status</InputLabel>
              <Select
                required
                labelId="status-select-label"
                id="status-select"
                value={status}
                onChange={handleChange}
              >
                <MenuItem value={"completed"}>Complete</MenuItem>
                <MenuItem value={"incomplete"}>Incomplete</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="priority-select-label">Priority</InputLabel>
              <Select
                required
                labelId="priority-select-label"
                id="priority-select"
                value={priority}
                onChange={handlePriorityChange}
              >
                <MenuItem value={"high"}>High</MenuItem>
                <MenuItem value={"medium"}>Medium</MenuItem>
                <MenuItem value={"low"}>Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box>
          <Button type="submit" variant="contained" autoFocus>
            Update
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default EditTask;
