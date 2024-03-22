import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
  Link,
  Card,
  Paper,
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
              Transform your work and life , finally
            </Typography>
            <Typography variant="subtitle">
              Become focused,organized with <span>TEAM UP</span>. The world's
              task management app.
            </Typography>
          </Grid>

          {/* right side: Login Form */}
          <Grid item xs={12} sm={6}>
            <Paper elevation={3}>
              <Card sx={{ p: 3 }}>
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
                        sx={{ height: "45px" }}
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
                        <em>
                          Don't have an account?
                          <Link href={"/signup"}>{" Sign Up"}</Link>
                        </em>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              </Card>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login;
