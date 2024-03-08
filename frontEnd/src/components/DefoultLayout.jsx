import { Grid } from "@mui/material";
import SideNav from "./SideNav";
const DefoultLayout = () => {
  return (
    <div>
      <Grid sx={{ display: "flex" }}>
        <SideNav />
      </Grid>
    </div>
  );
};

export default DefoultLayout;
