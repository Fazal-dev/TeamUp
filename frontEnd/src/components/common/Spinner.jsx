import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography } from "@mui/material";
const Spinner = () => {
  return (
    <Box
      component={"div"}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
        gap: 10,
        textAlign: "center",
      }}
    >
      <Box component={"div"}>
        <Typography
          variant="body1"
          sx={{ fontWeight: 500, fontSize: "1.2rem" }}
        >
          Just a moment...
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          We're fetching your tasks. It won't take long!
        </Typography>
      </Box>
      <CircularProgress color="primary" size={50} />
    </Box>
  );
};

export default Spinner;
