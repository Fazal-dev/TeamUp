import { useState } from "react";
import { Grid, Typography, TextField, Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const registerUser = async () => {
    try {
      await axios.post("http://localhost:8000/api/user", formData);
      enqueueSnackbar("account created succesfully", {
        variant: "success",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
      navigate("/login");
    } catch (error) {
      enqueueSnackbar(error.response.data.error, {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "left" },
      });
      setFormData({ userName: "", email: "", password: "" });
      console.log(error);
    }
  };
  const navigate = useNavigate();

  const handleChangeData = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
          <Grid item xs={12}>
            <TextField
              label="User Name"
              variant="outlined"
              type="user name"
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
                <Link href={"/login"}> Sign In </Link>
              </em>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default SignUpForm;
