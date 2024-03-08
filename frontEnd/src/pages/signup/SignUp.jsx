import React from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
  Link,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { useState } from "react";

const SignUp = () => {
  const [userType, setUserType] = useState("");

  const handleChange = (event) => {
    setUserType(event.target.value);
  };
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
          <Grid marginTop={10} item xs={12} sm={6} textAlign={"center"}>
            <Typography variant="h5" marginY={3}>
              Ready to join Team Up?
            </Typography>
            <Typography variant="body1">
              Let's make studying more fun and productive together! Sign up now
              to start collaborating with your friends on study tasks and reach
              your academic goals faster. Let's get started on this exciting
              journey together!
            </Typography>
          </Grid>
          {/* right side: Login Form */}
          <Grid item xs={12} sm={6}>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12} textAlign={"center"}>
                  <Typography variant="h5">Sign Up</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="User Name"
                    variant="outlined"
                    type="user name"
                    fullWidth
                    required
                  />
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
                  <FormControl fullWidth>
                    <InputLabel id="demo-select-small-label">
                      User Type
                    </InputLabel>
                    <Select
                      fullWidth
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={userType}
                      label="userType"
                      onChange={handleChange}
                    >
                      <MenuItem value={"Admin"}>Admin</MenuItem>
                      <MenuItem value={"Member"}>Member</MenuItem>
                    </Select>
                  </FormControl>
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
                    Sign Up
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Grid
                    item
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Link href={"/login"}>
                      {"All ready have an account ? Sign In"}
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

export default SignUp;
