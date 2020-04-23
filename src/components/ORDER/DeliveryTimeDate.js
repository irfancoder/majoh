import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles({
  root: {
    width: "100%",
    boxSizing: "border-box",
    padding: "1em",
    marginTop: "0.5em",
  },
  action: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

const DeliveryTimeDate = ({ date, handleSetDate }) => {
  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className={classes.root}>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Delivery Time &amp; Date
        </Typography>

        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date"
          value={date}
          onChange={handleSetDate}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />

        {/* <Typography
          variant="body2"
          gutterBottom
          style={{ marginTop: "2em", fontWeight: "500" }}
        >
          Penghantaran makanan akan dibuat pada waktu tertera:
          <br />
          <em>Food delivery will be made within the following timeframe:</em>
          <br />
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          gutterBottom
          style={{ marginLeft: "2em" }}
        >
          <p>3PM-5PM</p>
        </Typography> */}
        <Typography
          variant="body2"
          gutterBottom
          style={{ marginTop: "2em", fontWeight: "500" }}
        >
          Buat masa ini, hanya Cash on Delivery sahaja diterima
          <br />
          <em>Only Cash on Delivery is available </em>
          <br />
        </Typography>
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default DeliveryTimeDate;
