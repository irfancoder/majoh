import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  action: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

const DeliveryTimeDate = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Delivery Time &amp; Date
        </Typography>

        <Typography variant="body2" component="p">
          All deliveries will be made within the following timeframe:
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DeliveryTimeDate;
