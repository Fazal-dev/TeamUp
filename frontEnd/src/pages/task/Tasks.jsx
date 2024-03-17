import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Card, Container, Typography } from "@mui/material";

const Tasks = () => {
  const tasks = [
    {
      task_title: "Task 1",
      description: "Description of Task 1",
      date: "2024-03-16",
      assignee: "John Doe",
      priority: "High",
      status: "In Progress",
    },
    {
      task_title: "Task 2",
      description: "Description of Task 2",
      date: "2024-03-17",
      assignee: "Jane Smith",
      priority: "Medium",
      status: "Pending",
    },
    {
      task_title: "Task 3",
      description: "Description of Task 3",
      date: "2024-03-18",
      assignee: "Alice Johnson",
      priority: "Low",
      status: "Completed",
    },
    {
      task_title: "Task 4",
      description: "Description of Task 4",
      date: "2024-03-19",
      assignee: "Bob Anderson",
      priority: "High",
      status: "In Progress",
    },
    {
      task_title: "Task 5",
      description: "Description of Task 5",
      date: "2024-03-20",
      assignee: "Emily Williams",
      priority: "Medium",
      status: "Pending",
    },
    {
      task_title: "Task 6",
      description: "Description of Task 6",
      date: "2024-03-21",
      assignee: "David Brown",
      priority: "Low",
      status: "Completed",
    },
    {
      task_title: "Task 7",
      description: "Description of Task 7",
      date: "2024-03-22",
      assignee: "Sarah Garcia",
      priority: "High",
      status: "In Progress",
    },
    {
      task_title: "Task 8",
      description: "Description of Task 8",
      date: "2024-03-23",
      assignee: "Michael Martinez",
      priority: "Medium",
      status: "Pending",
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
            mb: 10,
            mt: 3,
          }}
        >
          <Box>
            <Typography variant="h5">Tasks</Typography>
          </Box>
          <Box>
            <Button variant="contained" startIcon={<AddIcon />}>
              Add new task
            </Button>
          </Box>
        </Box>

        <Card sx={{ p: 2 }}>
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
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{task.task_title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{task.date}</TableCell>
                  <TableCell>{task.assignee}</TableCell>
                  <TableCell>{task.priority}</TableCell>
                  <TableCell>{task.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </Container>
    </div>
  );
};

export default Tasks;
