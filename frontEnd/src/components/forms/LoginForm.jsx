import React, { useState } from "react";
import { Grid, Typography, TextField, Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import Alert from "@mui/material/Alert";
const LoginForm = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: null,
    password: null,
    gentral: null,
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
      // If the error is due to incorrect credentials, set an appropriate error message
      if (error.response && error.response.status === 401) {
        setErrors({
          ...errors,
          gentral:
            "Invalid email or password. Please check your credentials and try again.",
          password: null,
          email: null,
        });
      } else {
        // For other types of errors
        setErrors({
          ...errors,
          email: error.response.data.error.email || null,
          password: error.response.data.error.password || null,
        });
      }
      console.error("Login failed:", error);
      setLoading(false);
    }
  };
  // oauth login
  const oauth2 = async () => {
    let authorizeCode;
    // request for authorize code
    try {
      const authData = await axios.post(
        "http://localhost:8000/api/auth/authorize",
        formData
      );
      authorizeCode = authData.data.code;
    } catch (error) {
      console.log(error.response.data.message);
      if (error.response && error.response.status === 401) {
        setErrors({
          ...errors,
          gentral:
            "Invalid email or password. Please check your credentials and try again.",
          password: null,
          email: null,
        });
      } else {
        // For other types of errors
        setErrors({
          ...errors,
          email: error.response.data.error.email || null,
          password: error.response.data.error.password || null,
        });
      }
      console.error("Login failed:", error);
      setLoading(false);
    }
    // exchange the code for token and refresh token
    if (!authorizeCode) {
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/api/oauth/token",
        {
          code: authorizeCode,
        }
      );

      // store the token in local strorage
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      // sucess message
      enqueueSnackbar(response.data.message, {
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
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    setFormData({ ...formData, [input.name]: input.value });
    setErrors({ ...errors, [input.name]: null });
  };
  // Function to validate email format
  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Validating email format
    if (!validateEmail(formData.email)) {
      setErrors({
        ...errors,
        email: "Please enter a valid email address.",
      });
      setLoading(false);
      return;
    }

    // login function
    try {
      // await login();
      await oauth2();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrors({
        ...errors,
        gentral: "Invalid email or password.",
        password: null,
        email: null,
      });
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
          {errors.gentral && (
            <Grid item xs={12}>
              <Alert severity="error">{errors.gentral}</Alert>
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
              error={errors.email !== null}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              name="password"
              required
              onChange={handleChange}
              value={formData.password}
              fullWidth
              error={errors.password !== null}
              helperText={errors.password}
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
                <Link sx={{ textDecoration: "none" }} href="/signup">
                  {" Sign Up here"}
                </Link>
              </em>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default LoginForm;
