import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ListIcon from "@mui/icons-material/List";
import DeleteIcon from "@mui/icons-material/Delete";
import SpaceDashboardSharpIcon from "@mui/icons-material/SpaceDashboardSharp";
import EditNoteTwoToneIcon from "@mui/icons-material/EditNoteTwoTone";
import axios from "axios";
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddMyTaskModal from "../../Modals/AddMyTaskModal";
import TaskCards from "../../components/TaskCards";

const fetchAllTask = async (token) => {
  try {
    const response = await axios.get("http://localhost:8000/api/task", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return null;
  }
};

const MyTask = () => {
  const [tasks, setTasks] = useState([]);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    // Fetch JWT token
    const token = localStorage.getItem("token");

    // Call getAllTask with the token
    if (token) {
      fetchAllTask(token)
        .then((tasks) => {
          console.log(tasks);
          setTasks(tasks);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

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
            <Typography variant="h5">To Do</Typography>
          </Box>
          <Box>
            <AddMyTaskModal />
          </Box>
        </Box>

        <Stack direction={"row"} spacing={2} p={1}>
          <Box>
            <Button
              onClick={() => setShowType("table")}
              variant="text"
              startIcon={<ListIcon />}
            >
              list
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
          <Grid container alignItems={"center"} justifyContent={"end"}>
            <Grid
              item
              sx={{
                paddingY: 1,
                display: `${showType === "table" ? "block" : "none"}`,
              }}
            >
              <TextField
                size="small"
                id="search"
                label="Search for Task"
                variant="filled"
              />
            </Grid>
          </Grid>
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
