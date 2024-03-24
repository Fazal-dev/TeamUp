import "react-calendar/dist/Calendar.css";
import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import styled from "@emotion/styled";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonCheckedTwoToneIcon from "@mui/icons-material/RadioButtonCheckedTwoTone";
import PersonIcon from "@mui/icons-material/Person";
import PriorityChart from "../../components/PriorityChart";

const CardData = [
  {
    title: "Total Task",
    amount: 100,
    icon: <ListAltIcon />,
  },
  {
    title: "completed Task",
    amount: 100,
    icon: <CheckCircleIcon />,
  },
  {
    title: "Incomplete  Task",
    amount: 100,
    icon: <RadioButtonCheckedTwoToneIcon />,
  },
  {
    title: "My Tasks",
    amount: 100,
    icon: <PersonIcon />,
  },
];

const StyledCard = styled(Card)({ width: 40 + "%", height: 140 });

const Dashbord = () => {
  const [value, setValue] = useState(new Date());

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
                      <Box>{card.icon}</Box>
                    </Stack>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography
                        sx={{ fontSize: 25 }}
                        variant="body2"
                        color="text.secondary"
                      >
                        <small>+</small> {card.amount}
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
                    <PriorityChart />
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
