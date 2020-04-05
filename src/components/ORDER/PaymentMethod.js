import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

import CardContent from "@material-ui/core/CardContent";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  action: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

const PaymentMethod = () => {
  const classes = useStyles();
  const [value, setValue] = useState("card");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Payment Method
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="paymentmethod"
            name="payment_method"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value="card"
              control={<Radio />}
              label="Credit/Debit Card"
            />
            <FormControlLabel
              value="online banking"
              control={<Radio />}
              label="Online banking (FPX)"
            />
            <FormControlLabel
              value="cash"
              control={<Radio />}
              label="Cash on Delivery"
            />
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default PaymentMethod;
