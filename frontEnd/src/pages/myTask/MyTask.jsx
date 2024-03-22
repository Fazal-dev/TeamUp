import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ListIcon from "@mui/icons-material/List";

import DeleteIcon from "@mui/icons-material/Delete";
import SpaceDashboardSharpIcon from "@mui/icons-material/SpaceDashboardSharp";
import EditNoteTwoToneIcon from "@mui/icons-material/EditNoteTwoTone";

import {
  Box,
  Button,
  Chip,
  Container,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import AddMyTaskModal from "../../Modals/AddMyTaskModal";
import TaskCards from "../../components/TaskCards";
const tasks = [
  {
    task_title: "Task 1",
    description: "Description of Task 1",
    date: "2024-03-16",
    priority: "High",
    status: "complete",
  },
  {
    task_title: "Task 2",
    description: "Description of Task 2",
    date: "2024-03-17",
    priority: "Medium",
    status: "complete",
  },
  {
    task_title: "Task 3",
    description: "Description of Task 3",
    date: "2024-03-18",
    priority: "Low",
    status: "complete",
  },
  {
    task_title: "Task 4",
    description: "Description of Task 4",
    date: "2024-03-19",
    priority: "High",
    status: "complete",
  },
  {
    task_title: "Task 5",
    description: "Description of Task 5",
    date: "2024-03-20",
    priority: "Medium",
    status: "complete",
  },
  {
    task_title: "Task 6",
    description: "Description of Task 6",
    date: "2024-03-21",
    priority: "Low",
    status: "complete",
  },
  {
    task_title: "Task 7",
    description: "Description of Task 7",
    date: "2024-03-22",
    priority: "High",
    status: "incomplete",
  },
  {
    task_title: "Task 8",
    description: "Description of Task 8",
    date: "2024-03-23",
    priority: "Medium",
    status: "complete",
  },
];
const MyTask = () => {
  const [showType, setShowType] = useState("table");
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
            <Typography variant="h5">My Day</Typography>
          </Box>
          <Box>
            <AddMyTaskModal />
          </Box>
        </Box>
        <Stack direction={"row"} spacing={2} p={2}>
          <Box>
            <Button
              onClick={() => setShowType("table")}
              variant="text"
              startIcon={<ListIcon />}
            >
              LIST
            </Button>
          </Box>
          <Box>
            <Button
              onClick={() => setShowType("card")}
              variant="text"
              startIcon={<SpaceDashboardSharpIcon />}
            >
              card
            </Button>
          </Box>
        </Stack>

        {showType === "table" ? (
          <Paper elevation={2} sx={{ p: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Task Tittle</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>priority</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions </TableCell>
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
                    <TableCell>{task.priority}</TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        variant="outlined"
                        label={task.status}
                        color={
                          task.status === "complete" ? "success" : "warning"
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction={"row"} spacing={1}>
                        <Box>
                          <Link>
                            <EditNoteTwoToneIcon />
                          </Link>
                        </Box>
                        <Box>
                          <Link sx={{ color: "red" }}>
                            <DeleteIcon />
                          </Link>
                        </Box>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        ) : (
          <div>
            <TaskCards tasks={tasks} />
          </div>
        )}
      </Container>
    </div>
  );
};

export default MyTask;
