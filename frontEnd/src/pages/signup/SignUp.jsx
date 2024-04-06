import { Container, Grid, Typography, Box, Card, Paper } from "@mui/material";
import SignUpForm from "../../components/forms/SignUpForm";

const SignUp = () => {
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
            <Typography variant="h4" marginY={3} sx={{ fontWeight: 500 }}>
              Welcome to a smarter way to manage tasks!
            </Typography>
            <Typography variant="body" sx={{ lineHeight: 1.5 }}>
              Sign up for{" "}
              <span style={{ color: "#673ab7", fontWeight: "800" }}>
                Priority X
              </span>{" "}
              and take the first step towards a more organized and productive
              future.
            </Typography>
          </Grid>
          {/* right side */}
          <Grid item xs={12} sm={6}>
            <Paper elevation={3}>
              <Card sx={{ p: 4 }}>
                {/* sigup form */}
                <SignUpForm />
              </Card>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SignUp;
