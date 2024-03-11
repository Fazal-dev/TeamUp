import React from "react";
import { Outlet } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
const GuestLayout = () => {
  return (
    <div>
      <Box>
        <AppBar>
          <Toolbar>
            <Avatar sx={{ mr: 3 }} />
            <Typography variant="h6" component="div">
              Team Up
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default GuestLayout;
