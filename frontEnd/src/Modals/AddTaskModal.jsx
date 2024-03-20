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
} from "@mui/material";

import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// custom style
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(3),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
  },
}));

const AddTaskModal = () => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [formData, setFormData] = useState({
    taskTitle: "",
    description: "",
    assignedTo: "",
    dueDate: null,
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
    setStatus(event.target.value);
  };
  // MODAL OPEN
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    handleClose();
  };
  // date handle
  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      dueDate: date.toISOString(),
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
                value={formData.taskTitle}
                onChange={handleInputChange}
                size="normal"
                fullWidth
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
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
                    onChange={handleChange}
                  >
                    <MenuItem value={"complete"}>complete</MenuItem>
                    <MenuItem value={"incomplete"}>incomplete</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Due Date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleDateChange}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Priority
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={priority}
                    label="Priority"
                    onChange={handlePriorityChange}
                  >
                    <MenuItem value={"High"}>High</MenuItem>
                    <MenuItem value={"medium"}>Medium</MenuItem>
                    <MenuItem value={"Low"}>Low</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  label="Assign to"
                  name="assignedTo"
                  value={formData.assignedTo}
                  onChange={handleInputChange}
                  size="normal"
                  fullWidth
                />
              </Grid>
            </Grid>
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
