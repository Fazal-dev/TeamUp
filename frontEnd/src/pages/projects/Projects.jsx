import {
  Box,
  Button,
  Container,
  Link,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteTwoToneIcon from "@mui/icons-material/EditNoteTwoTone";
import axios from "axios";
import Swal from "sweetalert2";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useSnackbar } from "notistack";
import environment from ".././../../envirment.js";
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const fetchAllProjects = async (token) => {
    try {
      const response = await axios.get(`${environment.baseUrl}/api/project`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjects(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };
  const getUserInfo = async () => {
    try {
      const response = await axios.get(`${environment.baseUrl}/api/user/me`);
      setCreatedBy(response.data.createdBy);
      console.log(response.data.userName);
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };
  // delete project
  const deleteProject = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios
        .delete(`${environment.baseUrl}/api/project/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          enqueueSnackbar(res.data.message, {
            variant: "success",
            autoHideDuration: 5000,
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
          res.data;
        });
    } catch (error) {
      console.log("Error delete task :", error.message);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    getUserInfo();
    fetchAllProjects(token);
  }, []);

  const handleRefresh = () => {
    const token = localStorage.getItem("token");
    getUserInfo();
    fetchAllProjects(token);
  };
  const handleDeleteProject = async (id) => {
    getUserInfo();
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
        // DELETE project
        deleteProject(id);
        handleRefresh();
      }
    });
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
            <Typography variant="h5">Projects</Typography>
            <Button
              sx={{ mt: 2 }}
              variant="outlined"
              onClick={handleRefresh}
              startIcon={<RefreshIcon />}
            >
              refresh
            </Button>
          </Box>
        </Box>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No Project</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.length == 0 || projects === null ? (
                <TableRow>
                  <TableCell colSpan={6} rowSpan={6} align="center">
                    <Typography variant="subtitle1" color="textSecondary">
                      No projects found.
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      You haven't added any project yet. Click the "create
                      Project" button to get started.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                projects.map((project, index) => (
                  <TableRow
                    key={project._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{project.projectName}</TableCell>
                    <TableCell>{project.description}</TableCell>
                    <TableCell>{project.startDate}</TableCell>
                    <TableCell>{project.endDate}</TableCell>
                    <TableCell>
                      <Stack direction={"row"} spacing={1}>
                        <Box>
                          <Tooltip title="Edit project">
                            <Link
                              onClick={() =>
                                navigate(`/editProject/${project._id}`)
                              }
                            >
                              <EditNoteTwoToneIcon />
                            </Link>
                          </Tooltip>
                        </Box>
                        <Box>
                          <Tooltip title="Delete project">
                            <Link
                              onClick={() => handleDeleteProject(project._id)}
                              sx={{ color: "red" }}
                            >
                              <DeleteIcon />
                            </Link>
                          </Tooltip>
                        </Box>
                        <Box>
                          <Tooltip title="view Task">
                            <Link
                              onClick={() =>
                                navigate(`/projectTask/${project._id}`)
                              }
                            >
                              <InfoOutlinedIcon />
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
      </Container>
    </div>
  );
};

export default Projects;
