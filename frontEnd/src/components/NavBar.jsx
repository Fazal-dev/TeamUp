import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import MuiAppBar from "@mui/material/AppBar";
import { Grid, IconButton, Toolbar } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const NavBar = ({ open, handleDrawerOpen }) => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Fetch user ID from the token
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    // Fetch user name using user ID
    const fetchUserName = async (userId) => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/user/${userId}`
        );
        const userName = response.data.userName;
        setUserName(userName);
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };

    fetchUserName(userId);
  }, []);
  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Grid
            container
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item md={1}>
              <Typography variant="h6" noWrap component="div">
                Priority X
              </Typography>
            </Grid>
            <Grid item>
              <Grid
                container
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Grid item>{userName}</Grid>
                <Grid item>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
