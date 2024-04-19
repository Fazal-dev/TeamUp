import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PriorityChart from "../../components/charts/PriorityChart";
import ProgressChart from "../../components/charts/ProgressChart";
const ProjectDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const { projectId } = useParams();
  const navigate = useNavigate();
  // Calculate completed and incomplete tasks count
  const completedCount = tasks.filter(
    (task) => task.status === "completed"
  ).length;
  const incompleteCount = tasks.length - completedCount;

  // fetch project task
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/projectTask/${projectId}`
      );
      setTasks(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching project task information:", error.message);
    }
  };
  useEffect(() => {
    fetchData();
    console.log(tasks);
  }, []);
  // Filter tasks based on priority
  const getChartData = () => {
    const priorityCounts = {
      high: 0,
      medium: 0,
      low: 0,
    };

    tasks.forEach((task) => {
      priorityCounts[task.priority]++;
    });

    return [priorityCounts.high, priorityCounts.medium, priorityCounts.low];
  };

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(`/projectTask/${projectId}`)}
        ></Button>
      </Box>
      <Box sx={{ mb: 6, mt: 6 }}>
        <Typography variant="h5">Project Dashboard</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={6} sx={{ width: 1000 }}>
          <Card sx={{ height: 60 + "vh", p: 2 }}>
            <CardContent>
              <Box height={100 + "vh"}>
                {/* priority chart */}
                <PriorityChart chartData={getChartData()} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ height: 60 + "vh", p: 2 }}>
            <CardContent>
              <Box height={100 + "vh"}>
                {/* progress chart */}
                <ProgressChart
                  completedCount={completedCount}
                  incompleteCount={incompleteCount}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectDashboard;
