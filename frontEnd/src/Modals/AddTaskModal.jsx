import { useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Alert,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import { useSnackbar } from "notistack";
// custom style
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(4),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(4),
  },
}));

const AddTaskModal = ({ projectID, setTasks }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [project, setProject] = useState({});
  const [error, setError] = useState("");
  // reset the states
  const refreshTheForm = () => {
    setDate(null);
    setDescription("");
    setPriority("");
    setStatus("");
    setTaskTitle("");
    setError("");
  };
  // create task
  function createTask() {
    try {
      const formData = {
        status,
        priority,
        description,
        taskTitle,
        date,
        projectID,
      };
      axios
        .post(`http://localhost:8000/api/projectTask`, formData)
        .then((res) => {
          setTasks((prev) => [...prev, res.data]);
          // show message to the user
          enqueueSnackbar("Task added successfully ", {
            variant: "success",
            autoHideDuration: 5000,
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
          // reset the form
          refreshTheForm();
          handleClose();
        });
    } catch (error) {
      console.log(error.message);
    }
  }
  // MODAL OPEN
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    refreshTheForm();
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:8000/api/project/${projectID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const p = res.data;
        setProject(res.data);

        // Validate fields
        if (!status || !priority || !taskTitle || !description || !date) {
          setError("Please fill out all the fields");
          return;
        }
        // send to db
        createTask();
      })
      .catch((error) => {
        alert("An error happened, please check console");
        console.error("Error fetching project information:", error.message);
      });
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<AddIcon />}
      >
        Add new task
      </Button>
      {/* modal */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add New Task
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <form onSubmit={handleOnSubmit}>
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
            <Box sx={{ mb: 2 }}>
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
                  <InputLabel id="demo-simple-select-label">
                    Priority
                  </InputLabel>
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
            <Grid sx={{ mb: 2 }}>
              <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Due Date"
                  name="date"
                  value={date}
                  onChange={(date) => setDate(date)}
                  textField={<TextField />}
                  required
                />
              </LocalizationProvider>
            </Grid>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" autoFocus onClick={handleOnSubmit}>
            Create
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};

export default AddTaskModal;
