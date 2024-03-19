import React from "react";
import "./dashbord.css";
import { Chart } from "chart.js/auto";
import "react-calendar/dist/Calendar.css";
import { Bar } from "react-chartjs-2";
import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
const CardData = [
  {
    title: "Total Task",
    amount: 100,
    icon: "icon",
  },
  {
    title: "Total completed Task",
    amount: 100,
    icon: "icon",
  },
  {
    title: "Total Incompleted  Task",
    amount: 100,
    icon: "icon",
  },
  {
    title: "My Tasks",
    amount: 100,
    icon: "icon",
  },
];

const Dashbord = () => {
  const [value, setValue] = useState(new Date());
  return (
    <>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack spacing={4} direction={"row"}>
              {CardData.map((card, index) => (
                <Card key={index} sx={{ maxWidth: 40 + "%", height: 140 }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica {card.amount}
                      {card.icon}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Grid>
        </Grid>
        <Box height={20}>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={8}>
              <Card sx={{ height: 60 + "vh" }}>
                <CardContent>
                  <Box height={50 + "vh"}>
                    <Bar
                      options={{ responsive: true }}
                      data={{
                        labels: ["High", "Medium", "Low"],
                        datasets: [
                          {
                            label: "Tasks priority",
                            data: [200, 600, 700],
                          },
                        ],
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card sx={{ height: 60 + "vh" }}>
                <CardContent>
                  <Box height={100 + "vh"} width={50 + "vw"}>
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
