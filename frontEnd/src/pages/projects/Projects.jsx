import { Box, Container, Link, Paper, Typography } from "@mui/material";
import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";

const projects = [
  {
    id: 1,
    projectname: "Project Alpha",
    startdate: "2023-01-15",
    enddate: "2023-06-30",
    created_by: "John Doe",
    description: "This is the description for Project Alpha.",
  },
  {
    id: 2,
    projectname: "Project Beta",
    startdate: "2023-02-10",
    enddate: "2023-08-20",
    created_by: "Alice Smith",
    description: "This is the description for Project Beta.",
  },
  {
    id: 3,
    projectname: "Project Gamma",
    startdate: "2023-03-05",
    enddate: "2023-09-10",
    created_by: "Bob Johnson",
    description: "This is the description for Project Gamma.",
  },
  {
    id: 4,
    projectname: "Project Delta",
    startdate: "2023-04-20",
    enddate: "2023-10-30",
    created_by: "Emily Brown",
    description: "This is the description for Project Delta.",
  },
  {
    id: 5,
    projectname: "Project Epsilon",
    startdate: "2023-05-10",
    enddate: "2023-11-25",
    created_by: "Michael Wilson",
    description: "This is the description for Project Epsilon.",
  },
  {
    id: 6,
    projectname: "Project Zeta",
    startdate: "2023-06-01",
    enddate: "2023-12-15",
    created_by: "Sophia Lee",
    description: "This is the description for Project Zeta.",
  },
  {
    id: 7,
    projectname: "Project Eta",
    startdate: "2023-07-15",
    enddate: "2024-01-31",
    created_by: "David Martinez",
    description: "This is the description for Project Eta.",
  },
  {
    id: 8,
    projectname: "Project Theta",
    startdate: "2023-08-10",
    enddate: "2024-02-28",
    created_by: "Olivia Taylor",
    description: "This is the description for Project Theta.",
  },
  {
    id: 9,
    projectname: "Project Iota",
    startdate: "2023-09-05",
    enddate: "2024-03-15",
    created_by: "William Anderson",
    description: "This is the description for Project Iota.",
  },
  {
    id: 10,
    projectname: "Project Kappa",
    startdate: "2023-10-20",
    enddate: "2024-04-30",
    created_by: "Emma Garcia",
    description: "This is the description for Project Kappa.",
  },
];

const Projects = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
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
                <TableCell>Created by</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <TableRow
                  key={project.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{project.projectname}</TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell>{project.startdate}</TableCell>
                  <TableCell>{project.enddate}</TableCell>
                  <TableCell>{project.created_by}</TableCell>
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
