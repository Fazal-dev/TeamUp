import React from "react";

import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
  Link,
} from "@mui/material";

const Login = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Container maxWidth="md">
        <Grid container spacing={3}>
          {/* left side: Welcome Text */}
          <Grid item xs={12} sm={6} textAlign={"center"}>
            <Typography variant="h4" marginY={3}>
              Welcome to TeamUp!
            </Typography>
            <Typography variant="body1">
              Think of us as your study buddy in the digital world. With Team
              Up, you and your friends can tackle your study tasks together,
              making everything easier and more fun. Let's team up and ace those
              goals together!
            </Typography>
          </Grid>
          {/* right side: Login Form */}
          <Grid item xs={12} sm={6}>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12} textAlign={"center"}>
                  <Typography variant="h5">Sign In</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                  >
                    Sign In
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Grid
                    item
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Link href={"/signup"}>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login;
