import React from "react";
import Grid from "@material-ui/core/Grid";
import SimpleCard from "../components/NomographCard/NomographCard";
import PersistentDrawerLeft from "../components/NomographColectionDrawer/Drawer";

const content = (
  <div style={{ flexGrow: 1, padding: "20px" }}>
    <Grid container spacing={1} style={{ justifyContent: "center" }}>
      <Grid container item xs={12} spacing={8} direction="row">
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <SimpleCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <SimpleCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <SimpleCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <SimpleCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <SimpleCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <SimpleCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <SimpleCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <SimpleCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <SimpleCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <SimpleCard />
        </Grid>
      </Grid>
    </Grid>
  </div>
);

const Nomograph = () => {
  return <PersistentDrawerLeft content={content} />;
};

export default Nomograph;
