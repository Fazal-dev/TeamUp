import { Grid } from "@mui/material";
import SideNav from "../components/SideNav";
const DefoultLayout = () => {
  return (
    <div>
      <Grid
        sx={{ display: "flex", backgroundColor: "#f1f2f6", height: "100vh" }}
      >
        <SideNav />
      </Grid>
    </div>
  );
};

export default DefoultLayout;
