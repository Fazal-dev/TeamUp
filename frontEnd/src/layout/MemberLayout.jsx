import React from "react";
import { Grid } from "@mui/material";

import SideNavMember from "../components/member/SideNavMember";
const MemberLayout = () => {
  return (
    <div>
      <Grid
        sx={{ display: "flex", backgroundColor: "#f1f2f6", height: "100vh" }}
      >
        <SideNavMember />
      </Grid>
    </div>
  );
};

export default MemberLayout;
