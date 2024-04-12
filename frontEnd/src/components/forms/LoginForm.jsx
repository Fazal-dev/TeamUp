import React from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

const LoginForm = () => {
  const navigate = useNavigate("/");
  const [error, setError] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // login functoin
  const login = async () => {
    try {
      const user = await axios.post(
        "http://localhost:8000/api/user/login",
        formData
      );
      const token = user.data.token;

      // store token in local storage
      localStorage.setItem("token", token);

      // alert show to user login sucessfully
      enqueueSnackbar(user.data.message, {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
        autoHideDuration: 3000,
      });
      // reset the state
      setFormData({
        email: "",
        password: "",
      });
      setLoading(false);
      navigate("/dashbord");
    } catch (error) {
      console.log(error);
      // error
      setError(error.response.data.error);
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    setFormData({ ...formData, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Validate password length
    const { password } = formData;
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
      password
    );

    if (!isPasswordValid) {
      setError(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit."
      );
      setLoading(false);
      return;
    }

    // login function
    try {
      await login();
      setLoading(false);
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.");
      setLoading(false);
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} textAlign={"center"}>
            <Typography variant="h5">Sign In</Typography>
          </Grid>
          {error && (
            <Grid xs={12} item sx={{ textAlign: "center" }}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              required
              onChange={handleChange}
              value={formData.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              variant="outlined"
              name="password"
              required
              onChange={handleChange}
              value={formData.password}
              type="password"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              sx={{ height: "45px" }}
              disabled={loading}
            >
              {loading ? "Sign In.." : "Sign In"}
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
                <Link href="/signup">{" Sign Up here"}</Link>
              </em>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default LoginForm;
