import { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  Box,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Alert,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
const EditProjectTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  // reset the states
  const refreshTheForm = () => {
    setDescription("");
    setPriority("");
    setStatus("");
    setTaskTitle("");
    setError("");
  };

  const fetchProjectTask = () => {
    try {
      axios
        .get(`http://localhost:8000/api/projectTask/task/${id}`)
        .then((res) => {
          setDescription(res.data.description);
          setPriority(res.data.priority);
          setStatus(res.data.status);
          setTaskTitle(res.data.taskTitle);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  // update  task
  function updateTask() {
    try {
      const formData = {
        taskTitle,
        status,
        priority,
        description,
      };
      axios
        .patch(`http://localhost:8000/api/projectTask/${id}`, formData)
        .then((res) => {
          // show message to the user
          enqueueSnackbar("Task updated successfully ", {
            variant: "success",
            autoHideDuration: 5000,
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
          refreshTheForm();
          navigate("/projects");
        });
    } catch (error) {
      enqueueSnackbar("Failed to update task. Please try again later.", {
        variant: "error",
        autoHideDuration: 5000,
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      console.log(error.message);
    }
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // Validate fields
    if (!status || !priority || !taskTitle || !description) {
      setError("Please fill out all the fields");
      return;
    }
    updateTask();
  };
  useEffect(() => {
    fetchProjectTask();
  }, []);
  return (
    <>
      <Paper sx={{ p: 6, width: "600px" }}>
        <form>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Task title"
              name="taskTitle"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              size="normal"
              fullWidth
            />
          </Box>
          <Box sx={{ mb: 2, width: "500px" }}>
            <TextField
              label="Description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              size="normal"
              fullWidth
            />
          </Box>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  label="Status"
                  size="normal"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value={"completed"}>complete</MenuItem>
                  <MenuItem value={"incomplete"}>incomplete</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={6}>
              {/* priority */}
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={priority}
                  label="Priority"
                  size="normal"
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <MenuItem value={"high"}>High</MenuItem>
                  <MenuItem value={"medium"}>Medium</MenuItem>
                  <MenuItem value={"low"}>Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box>
            <Button
              fullWidth
              sx={{ height: 50 }}
              variant="contained"
              onClick={handleOnSubmit}
            >
              update
            </Button>
          </Box>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
        </form>
      </Paper>
    </>
  );
};

export default EditProjectTask;
