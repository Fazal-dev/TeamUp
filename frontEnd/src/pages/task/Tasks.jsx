import React, { useState } from "react";
import AddTaskModal from "../../Modals/AddTaskModal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Chip, Menu, MenuItem } from "@mui/material";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";
import { Box, Container, Paper, Typography } from "@mui/material";

const Tasks = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const tasks = [
    {
      task_title: "Task 1",
      description: "Description of Task 1",
      date: "2024-03-16",
      assignee: "John Doe",
      priority: "High",
      status: "completed",
    },
    {
      task_title: "Task 2",
      description: "Description of Task 2",
      date: "2024-03-17",
      assignee: "Jane Smith",
      priority: "Medium",
      status: "incomplete",
    },
    {
      task_title: "Task 3",
      description: "Description of Task 3",
      date: "2024-03-18",
      assignee: "Alice Johnson",
      priority: "Low",
      status: "completed",
    },
    {
      task_title: "Task 4",
      description: "Description of Task 4",
      date: "2024-03-19",
      assignee: "Bob Anderson",
      priority: "High",
      status: "completed",
    },
    {
      task_title: "Task 5",
      description: "Description of Task 5",
      date: "2024-03-20",
      assignee: "Emily Williams",
      priority: "Medium",
      status: "incomplete",
    },
    {
      task_title: "Task 6",
      description: "Description of Task 6",
      date: "2024-03-21",
      assignee: "David Brown",
      priority: "Low",
      status: "completed",
    },
    {
      task_title: "Task 7",
      description: "Description of Task 7",
      date: "2024-03-22",
      assignee: "Sarah Garcia",
      priority: "High",
      status: "completed",
    },
    {
      task_title: "Task 8",
      description: "Description of Task 8",
      date: "2024-03-23",
      assignee: "Michael Martinez",
      priority: "Medium",
      status: "incomplete",
    },
  ];
  return (
    <div>
      <Container sx={{ width: "100vw" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 5,
            mt: 3,
          }}
        >
          <Box>
            <Typography variant="h5">Project Tasks</Typography>
          </Box>
          <Box>
            <AddTaskModal />
          </Box>
        </Box>

        <Paper elevation={2} sx={{ p: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Task Tittle</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Assignee</TableCell>
                <TableCell>priority</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{task.task_title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{task.date}</TableCell>
                  <TableCell>{task.assignee}</TableCell>
                  <TableCell>{task.priority}</TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      variant="outlined"
                      label={task.status}
                      color={
                        task.status === "completed" ? "success" : "warning"
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <MoreVertSharpIcon onClick={handleMenu} />
                      <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={handleClose}>Edit</MenuItem>
                        <MenuItem onClick={handleClose}>Delete</MenuItem>
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

export default Tasks;
