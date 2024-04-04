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
  useEffect(() => {
    const token = localStorage.getItem("token");
    getUserInfo();
    fetchAllProjects(token);
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleRefresh = () => {
    const token = localStorage.getItem("token");
    getUserInfo();
    fetchAllProjects(token);
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
                <TableCell>Project Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <TableRow
                  key={project._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
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
                        <MenuItem onClick={handleClose}>Delete</MenuItem>
                        <Link underline="none" href="/projectTask">
                          <MenuItem onClick={handleClose}>View</MenuItem>
                        </Link>
                      </Menu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </div>
  );
};

export default Projects;
