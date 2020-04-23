import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    boxSizing: "border-box",
    paddingTop: "2em",
    width: "100%",
    margin: "auto",
  },
  input: {
    marginBottom: "2em",
  },
}));

const InputContact = ({ handleInput }) => {
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.root} spacing={6}>
        <Grid item md={6} xs={12}>
          <TextField
            className={classes.input}
            name="name"
            type="string"
            fullWidth
            label="Name"
            variant="outlined"
            onChange={handleInput}
          />

          <TextField
            className={classes.input}
            name="email"
            type="string"
            fullWidth
            label="Email"
            variant="outlined"
            onChange={handleInput}
          />

          <TextField
            className={classes.input}
            type="number"
            name="phone"
            fullWidth
            label="Phone number"
            placeholder="+60"
            variant="outlined"
            onChange={handleInput}
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <TextField
            id="filled-multiline-static"
            className={classes.input}
            multiline
            name="message"
            label="Message"
            rows="10"
            onChange={handleInput}
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
};

export default InputContact;
