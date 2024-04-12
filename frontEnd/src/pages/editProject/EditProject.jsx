import React, { useEffect, useState } from "react";
import { Button, Box, TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { useSnackbar } from "notistack";
import Paper from "@mui/material/Paper";
import { useParams, useNavigate } from "react-router-dom";

const EditProject = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
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

  useEffect(() => {
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
        setDescription(res.data.description);
      })
      .catch((error) => {
        alert("An error happened, please check console");
        console.error("Error fetching project information:", error.message);
      });
  }, []);

  const resetForm = () => {
    setProjectName("");
    setDescription("");
    setError(null);
  };

  const validateFields = () => {
    if (!projectName || !description) {
      setError(
        "All fields are required. Please make sure to fill out all fields before proceeding."
      );
      return false;
    }
    return true;
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!validateFields()) {
        setLoading(false);
        return;
      }
      //    UPDATE THE PROJECT
      try {
        const token = localStorage.getItem("token");
        const res = await axios.patch(
          `http://localhost:8000/api/project/${id}`,
          { projectName, description },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Project updated:", res.data);
        resetForm();
        navigate("/projects");
      } catch (error) {
        console.error("Error updating task:", error.message);
      }
      setLoading(false);
      resetForm();
      enqueueSnackbar("Project successfully updated", {
        variant: "success",
        autoHideDuration: 6000,
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    } catch (error) {
      console.error("Error creating project:", error);
      setError("Failed to create project. Please try again.", error);
      setLoading(false);
    }
  };

  return (
    <>
      <Paper sx={{ p: 4 }}>
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
          <Box sx={{ mb: 2 }}>
            <Button
              variant="contained"
              onClick={handleOnSubmit}
              disabled={loading}
            >
              {loading ? "Updateting..." : "Update"}
            </Button>
          </Box>
        </form>
        {error && (
          <Box sx={{ textAlign: "center" }}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}
      </Paper>
    </>
  );
};

export default EditProject;
