import React, { useEffect, useRef, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useFormik } from "formik";
import { stat } from "../../nomographExample/settings";
import { MassFlowNomographUpdated } from "../../nomographExample/MassFlowNomographUpdated/MassFlowNomographUpdated";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export const MassFlowNomographContent = (props) => {
  const inputEl = useRef(null);
  const classes = useStyles();


  // initial form values
  const initialFormValues = {
    label1: 0,
    label2: 20,
  };

  const [massFlowCalculationS, setMassFlowCalculationS] = useState(
    stat.userInput.massFlowCalculation
  );

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: initialFormValues,
    onSubmit: (values) => {
      setMassFlowCalculationS(() => {
        return {
          ...massFlowCalculationS,
          deltaTemp: Number(values.label1),
        };
      });
    },
  });

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={11}>
          <Paper
            className={classes.paper}
            ref={inputEl}
            id="MassFlowNomographContainer"
          >
            <MassFlowNomographUpdated
              massFlowCalculationS={massFlowCalculationS}
              setMassFlowCalculationS={setMassFlowCalculationS}
            />
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <form>
              <TextField
                onChange={handleChange}
                id="filled-number"
                label="Delta T"
                type="number"
                name="label1"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
              />
              <TextField
                onChange={handleChange}
                disabled
                id="filled-number"
                label="Power"
                value={20}
                type="number"
                name="label2"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
              />
              <Button
                className="mt-2"
                variant="contained"
                color="primary"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                Result
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
