import { useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  Box,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Paper,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  // ALL THE STATES
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    taskTitle: "",
    description: "",
    date: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // PRIORITY
  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };
  // STATUS
  const handleChange = (event) => {
    if (!formData.date) {
      const selectedStatus = event.target.value;
      setStatus(selectedStatus);
    }
  };
  // get user details
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;
  // DATE SET
  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date: date,
    });
    // Automatically update status based on selected date
    const currentDate = new Date();
    const selectedStatus = date < currentDate ? "completed" : "incomplete";
    setStatus(selectedStatus);
  };
  // get user details
  const getUserInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/user/me`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    getUserInfo();

    const updatedFormData = {
      ...formData,
      priority: priority,
      status: status,
      user: {
        id: user,
      },
    };

    try {
      // ADD NEW TASK
      const res = await axios.post(
        "http://localhost:8000/api/task",
        updatedFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
    enqueueSnackbar("Task added successfully ", {
      variant: "success",
      autoHideDuration: 5000,
      anchorOrigin: { vertical: "top", horizontal: "right" },
    });
    navigate("/MyTasks");
    setFormData({
      taskTitle: "",
      description: "",
      date: null,
    });
    setPriority("");
    setStatus("");
  };

  return (
    <>
      <Paper sx={{ p: 10 }}>
        <form onSubmit={handleOnSubmit}>
          <Box sx={{ m: 2 }}>
            <Typography variant="h5">Add new Task</Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              required
              label="Task title"
              name="taskTitle"
              value={formData.taskTitle}
              onChange={handleInputChange}
              size="small"
              fullWidth
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              required
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              size="small"
              fullWidth
            />
          </Box>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  label="Status"
                  onChange={handleChange}
                  disabled={!!formData.date}
                >
                  <MenuItem value={"completed"}>complete</MenuItem>
                  <MenuItem value={"incomplete"}>incomplete</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={priority}
                  label="Priority"
                  onChange={handlePriorityChange}
                >
                  <MenuItem value={"high"}>High</MenuItem>
                  <MenuItem value={"medium"}>Medium</MenuItem>
                  <MenuItem value={"low"}>Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ mb: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Due Date"
                name="dueDate"
                value={formData.date}
                onChange={handleDateChange}
              />
            </LocalizationProvider>
          </Box>
          <Box>
            <Button type="submit" variant="contained" autoFocus>
              Create
            </Button>
          </Box>
        </form>
      </Paper>
    </>
  );
};

export default AddTask;
