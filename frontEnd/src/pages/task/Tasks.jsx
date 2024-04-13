import React, { useEffect, useState } from "react";
import AddTaskModal from "../../Modals/AddTaskModal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Chip, Menu, MenuItem, Typography } from "@mui/material";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";
import { Box, Container, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
const Tasks = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [tasks, setTasks] = useState([]);
  const { id } = useParams();
  const handleClose = () => {
    setAnchorEl(null);
  };
  // FETCH PROJECT TASKS
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/projectTask/${id}`
      );
      setTasks(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching project task information:", error.message);
    }
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Container sx={{ width: "100vw" }}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 5,
              mt: 5,
            }}
          >
            <Box>
              <Typography variant="h5">Project Task</Typography>
            </Box>
            <Box>
              <AddTaskModal projectID={id} setTasks={setTasks} />
            </Box>
          </Box>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No Task</TableCell>
                  <TableCell>Task Tittle</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>priority</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {tasks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} sx={{ textAlign: "center" }}>
                      <Typography variant="subtitle1" color="textSecondary">
                        No tasks found.
                      </Typography>
                      <Typography variant="body2" color="textSecondary" mt={2}>
                        Get organized by adding some tasks! You can create new
                        tasks using add new task button.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  tasks.map((task, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{task.taskTitle}</TableCell>
                      <TableCell>{task.description}</TableCell>
                      <TableCell>{task.date}</TableCell>
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
                  ))
                )}
              </TableBody>
            </Table>
          </Paper>
        </Box>
      </Container>
    </div>
  );
};

export default Tasks;
