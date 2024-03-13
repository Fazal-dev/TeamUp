import React from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import theme from "../theme";
const GuestLayout = () => {
  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar sx={{ m: 1 }} />
        <Typography variant="h5" component="div">
          Team Up
        </Typography>
      </Box>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default GuestLayout;
