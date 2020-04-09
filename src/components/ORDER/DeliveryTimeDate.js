import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

import CardContent from "@material-ui/core/CardContent";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles({
  root: {
    width: "100%",
    boxShadow: 0,
  },
  action: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

const DeliveryTimeDate = ({ handleSetDate }) => {
  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Card className={classes.root}>
        <CardContent>
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
            onChange={(e) => handleSetDate(e)}
            defaultValue={new Date()}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />

          <Typography
            variant="body2"
            gutterBottom
            style={{ marginTop: "1em", fontWeight: "500" }}
          >
            Deliveries will be made within the following timeframe:
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            style={{ marginLeft: "2em" }}
          >
            <p>BREAKFAST - 8AM-9AM</p>
            <p>LUNCH - 11AM-12PM</p>
            <p>DINNER - 5PM-6PM</p>
          </Typography>
        </CardContent>
      </Card>
    </MuiPickersUtilsProvider>
  );
};

export default DeliveryTimeDate;
