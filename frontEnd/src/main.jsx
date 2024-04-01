import React from "react";
import "@fontsource/inter";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./router/router.jsx";
import theme from "./theme.js";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <SnackbarProvider>
      <RouterProvider router={router} />
    </SnackbarProvider>
  </ThemeProvider>
);
