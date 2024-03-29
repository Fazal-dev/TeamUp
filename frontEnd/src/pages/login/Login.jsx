import { Container, Grid, Typography, Card, Paper } from "@mui/material";
import LoginForm from "../../components/forms/LoginForm";

const Login = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Grid
        container
        spacing={10}
        justifyContent={"space-around"}
        alignItems={"center"}
      >
        {/* left side: Welcome Text */}
        <Grid item xs={12} sm={6} textAlign={"center"}>
          <Typography variant="h4" marginY={3}>
            Transform your work and life , finally
          </Typography>
          <Typography variant="subtitle">
            Become focused,organized with <span>TEAM UP</span>. The world's task
            management app.
          </Typography>
        </Grid>

        {/* right side */}
        <Grid item xs={12} sm={6}>
          <Paper elevation={3}>
            <Card sx={{ p: 3 }}>
              {/* loginform */}
              <LoginForm />
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
