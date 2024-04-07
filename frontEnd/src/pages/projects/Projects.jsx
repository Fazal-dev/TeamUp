import { Box, Button, Container, Link, Paper, Typography } from "@mui/material";
import { Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";
import axios from "axios";
import Swal from "sweetalert2";

const Projects = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [projects, setProjects] = useState([]);

  const fetchAllProjects = async (token) => {
    try {
      const response = await axios.get("http://localhost:8000/api/project", {
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
      const response = await axios.get(`http://localhost:8000/api/user/me`);
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
        .delete(`http://localhost:8000/api/project/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data.message);
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

  const handleClose = () => {
    setAnchorEl(null);
  };
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
        handleClose();
        // DELETE project
        deleteProject(id).then(() => {
          Swal.fire({
            title: "Deleted!",
            text: "Your task has been deleted.",
            icon: "success",
          });
        });
        handleRefresh();
      }
    });
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
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
            <Button onClick={handleRefresh}>refresh</Button>
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
                      <div>
                        <MoreVertSharpIcon onClick={handleMenu} />
                        <Menu
                          id="menu-appbar"
                          anchorEl={anchorEl}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                        >
                          <MenuItem onClick={handleClose}>Edit</MenuItem>
                          <MenuItem
                            onClick={() => handleDeleteProject(project._id)}
                          >
                            Delete
                          </MenuItem>
                          <Link underline="none" href="/projectTask">
                            <MenuItem onClick={handleClose}>View</MenuItem>
                          </Link>
                        </Menu>
                      </div>
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
