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
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import MemberUser from "./MemberUser";
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
const TaskMember = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  // tab
  const [value, setValue] = React.useState("Task");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <Container sx={{ width: "100vw" }}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} aria-label="tab">
                <Tab label="Task" value="Task" />
                <Tab label="Members" value="Members" />
              </TabList>
            </Box>
            <TabPanel value="Task">
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tasks.map((task, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
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
                              task.status === "completed"
                                ? "success"
                                : "warning"
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </TabPanel>
            <TabPanel value="Members">
              <MemberUser />
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </div>
  );
};

export default TaskMember;
