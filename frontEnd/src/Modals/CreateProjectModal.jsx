import { useState } from "react";
import {
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";

const CreateProjectModal = ({ open }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClickOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setProjectName();
    setDescription("");
    setStartDate(null);
    setEndDate(null);
    setError("");
    setError(null);
  };
  const [user, setUser] = useState({});
  // get user details
  const getUserInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/user/me`);
      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };
  const validateDates = () => {
    if (startDate && endDate && startDate >= endDate) {
      setError("End date must be after the start date.");
      return false;
    }
    return true;
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!validateDates()) {
      setLoading(false);
      return;
    }
    getUserInfo();
    try {
      // Make HTTP POST request to create project
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8000/api/project",
        {
          projectName,
          description,
          startDate,
          endDate,
          user: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Project created:", response.data);
      setLoading(false);
      setProjectName();
      setDescription("");
      setStartDate(null);
      setEndDate(null);
      setError("");
      handleClose();
    } catch (error) {
      console.error("Error creating project:", error);
      setError("Failed to create project. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <ListItemButton
        onClick={handleClickOpen}
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : "auto",
            justifyContent: "center",
          }}
        >
          <AddIcon />
        </ListItemIcon>
        <ListItemText
          primary={"create project"}
          sx={{ opacity: open ? 1 : 0 }}
        />
      </ListItemButton>

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={modalOpen}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Create new project
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
                label="Project Name"
                name="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                size="normal"
                fullWidth
                required
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                label="Project Description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                size="normal"
                fullWidth
                required
              />
            </Box>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(date) => setStartDate(date)}
                    textField={<TextField />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={(date) => setEndDate(date)}
                    textField={<TextField />}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleOnSubmit}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </Button>
        </DialogActions>
        {error && <Box sx={{ color: "red" }}>{error}</Box>}
      </Dialog>
    </>
  );
};

export default CreateProjectModal;
