import React from "react";
import ImgMediaCard from "../components/AppCard/AppCard";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import PersistentDrawerLeft from "../components/startAppPresistentDrawer/Drawer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(6),
  },
}));
const StartPage = () => {
  const classes = useStyles();
  const matAppDesc = `This is an application for calculating the heat loss of a building or individual rooms`;
  const wrongDesc = `This application is under development or has not been added`;
  const nomogramDesc = `A collection of Nomographs to simplify daily tasks`;

  const content = (
    <Grid container spacing={1} style={{ justifyContent: "center" }}>
      <Grid container item xs={12} spacing={4} direction="row">
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ImgMediaCard
            desc={matAppDesc}
            img={"valuation-calculator-app-logo.png"}
            title={"Heat loss application"}
            link={"/mat-app"}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ImgMediaCard
            desc={nomogramDesc}
            img={"Nomogram.png"}
            title={"Nomograph Collection"}
            link={"/nomograph"}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ImgMediaCard
            desc={wrongDesc}
            img={"wrong.png"}
            title={"Coming soon"}
            link={"/start"}
          />
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <div className={classes.root}>
      <PersistentDrawerLeft content={content} />
    </div>
  );
};

export default StartPage;
