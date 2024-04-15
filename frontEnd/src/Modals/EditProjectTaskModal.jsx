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
import EditNoteTwoToneIcon from "@mui/icons-material/EditNoteTwoTone";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
// custom style
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(4),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(4),
  },
}));

const EditProjectTaskModal = ({ task, fetchData }) => {
  const { enqueueSnackbar } = useSnackbar();
  const id = task._id;
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);
  const [taskTitle, setTaskTitle] = useState(task.taskTitle);
  const [description, setDescription] = useState(task.description);
  const [error, setError] = useState("");
  // reset the states
  const refreshTheForm = () => {
    setDescription("");
    setPriority("");
    setStatus("");
    setTaskTitle("");
    setError("");
  };
  // create task
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
          fetchData();
          // show message to the user
          enqueueSnackbar("Task updated successfully ", {
            variant: "success",
            autoHideDuration: 5000,
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
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
    // Validate fields
    if (!status || !priority || !taskTitle || !description) {
      setError("Please fill out all the fields");
      return;
    }
    // send to db
    updateTask();
  };
  return (
    <>
      <Link onClick={handleClickOpen}>
        <EditNoteTwoToneIcon />
      </Link>
      {/* modal */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Update the task
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
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" autoFocus onClick={handleOnSubmit}>
            Update
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};

export default EditProjectTaskModal;
