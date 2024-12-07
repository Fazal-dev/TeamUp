import { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import environment from "../../../envirment.js";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const registerUser = async () => {
    try {
      await axios.post(`${environment.baseUrl}/api/user`, formData);
      enqueueSnackbar("Account created succesfully", {
        variant: "success",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
      navigate("/login");
      setFormData({ userName: "", email: "", password: "" });
    } catch (error) {
      setError(error.response.data.error);
      console.log(error);
    }
  };

  const handleChangeData = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const password = formData.password;

    // Validate password
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
      password
    );

    if (!isPasswordValid) {
      // Provide feedback to the user about password requirements
      setError(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit."
      );
    }
    // user registartion
    registerUser();
    console.log("Form submitted:", formData);
  };
  return (
    <>
      <form autoComplete="false" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} textAlign={"center"}>
            <Typography variant="h5">Sign Up</Typography>
          </Grid>
          {error && (
            <Grid xs={12} item sx={{ textAlign: "center" }}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              required
              name="userName"
              value={formData.userName}
              onChange={handleChangeData}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="email"
              type="email"
              label="Email"
              variant="outlined"
              fullWidth
              required
              value={formData.email}
              onChange={handleChangeData}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="password"
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              required
              value={formData.password}
              onChange={handleChangeData}
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
              <em>
                All ready have an account ?
                <Link sx={{ textDecoration: "none" }} href={"/login"}>
                  {" "}
                  Sign In{" "}
                </Link>
              </em>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default SignUpForm;
