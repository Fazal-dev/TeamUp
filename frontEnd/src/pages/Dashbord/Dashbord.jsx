import "react-calendar/dist/Calendar.css";
import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import styled from "@emotion/styled";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonCheckedTwoToneIcon from "@mui/icons-material/RadioButtonCheckedTwoTone";
import PersonIcon from "@mui/icons-material/Person";
import PriorityChart from "../../components/PriorityChart";
import { getToken } from "../../utility/index.js";
import axios from "axios";
const StyledCard = styled(Card)({ width: 40 + "%", height: 140 });

const Dashbord = () => {
  const [value, setValue] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  // Fetch JWT token
  const token = getToken();
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

  const fetchAllTask = async (token) => {
    try {
      const response = await axios.get("http://localhost:8000/api/task", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    // TODO fetch total projects
    fetchAllProjects(token);
    fetchAllTask(token);
  }, []);

  const totalTask = tasks.length;
  const totalProject = projects.length;
  // filter task
  const incompleteTasks = tasks.filter((task) => task.status === "incomplete");
  const completeTasks = tasks.filter((task) => task.status === "completed");
  const highPriorityTasks = tasks.filter((task) => task.priority === "high");
  const mediumPriorityTasks = tasks.filter(
    (task) => task.priority === "medium"
  );
  const lowPriorityTasks = tasks.filter((task) => task.priority === "low");
  // total counts
  const totalIncompleteTasks = incompleteTasks.length;
  const totalCompletedTasks = completeTasks.length;
  const totalHighPriorityTasks = highPriorityTasks.length;
  const totalMediumPriorityTasks = mediumPriorityTasks.length;
  const totalLowPriorityTasks = lowPriorityTasks.length;

  const chartData = [
    totalHighPriorityTasks,
    totalMediumPriorityTasks,
    totalLowPriorityTasks,
  ];
  const CardData = [
    {
      title: "Projects",
      amount: totalProject,
      icon: <ListAltIcon />,
    },
    {
      title: "completed Task",
      amount: totalCompletedTasks,
      icon: <CheckCircleIcon />,
    },
    {
      title: "Incomplete  Task",
      amount: totalIncompleteTasks,
      icon: <RadioButtonCheckedTwoToneIcon />,
    },
    {
      title: "My Tasks",
      amount: totalTask,
      icon: <PersonIcon />,
    },
  ];
  const getBackgroundColor = (title) => {
    switch (title) {
      case "Projects":
        return "#E57373";
      case "completed Task":
        return "#81C784";
      case "Incomplete  Task":
        return "#FFD54F";
      case "My Tasks":
        return "#64B5F6";
      default:
        return "transparent";
    }
  };
  return (
    <>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack spacing={4} direction={"row"} justifyContent={"stretch"}>
              {CardData.map((card, index) => (
                <StyledCard key={index}>
                  <CardContent sx={{ maxWidth: 400 }}>
                    <Stack
                      m={2}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      direction={"row"}
                      spacing={2}
                    >
                      <Box>
                        <Typography gutterBottom variant="h6" component="div">
                          {card.title}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          p: 1,
                          bgcolor: `${getBackgroundColor(card.title)}`,
                          borderRadius: "100px",
                        }}
                      >
                        {card.icon}
                      </Box>
                    </Stack>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography
                        sx={{ fontSize: 25 }}
                        variant="body2"
                        color="text.secondary"
                      >
                        <small>+ </small> {card.amount}
                      </Typography>
                    </Box>
                  </CardContent>
                </StyledCard>
              ))}
            </Stack>
          </Grid>
        </Grid>
        <Box height={20}>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={8}>
              <Card sx={{ height: 60 + "vh", p: 2 }}>
                <CardContent>
                  <Box height={50 + "vh"}>
                    {/* bar chart */}
                    <PriorityChart chartData={chartData} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card sx={{ height: 60 + "vh" }}>
                <CardContent>
                  <Box
                    height={100 + "vh"}
                    sx={{
                      p: 3,
                    }}
                    width={50 + "vw"}
                  >
                    {/* calender */}
                    <DayPicker
                      height={100 + "vh"}
                      mode="single"
                      selected={value}
                      onSelect={setValue}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Dashbord;
