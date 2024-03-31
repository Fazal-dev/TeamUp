import React from "react";
import { Grid, Typography, TextField, Button, Link } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

const LoginForm = () => {
  const [error, setError] = useState("fazal");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { enqueueSnackbar } = useSnackbar();
  // login
  const login = async () => {
    try {
      const user = await axios.post(
        "http://localhost:8000/api/user/login",
        formData
      );
      const token = user.data.token;
      // store token in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("isloggedIn", true);
      // alert show to user login sucessfully
      enqueueSnackbar(user.data.message, {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });

      if (user.data.userType === "admin") {
        navigate("/dashbord");
      } else {
        navigate("/memberTask");
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.response.data.error, {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "left" },
      });
      setFormData({
        email: "",
        password: "",
      });
    }
  };
  const navigate = useNavigate("/");

  const handleChange = ({ currentTarget: input }) => {
    setFormData({ ...formData, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // VALIDATE PASsWORD EMAIL HERE

    // login function
    await login();

    console.log(formData);
    setFormData({ email: "", password: "" });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} textAlign={"center"}>
            <Typography variant="h5">Sign In</Typography>
          </Grid>
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
            {error && <div>error</div>}
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
    </>
  );
};

export default LoginForm;