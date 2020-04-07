import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

import CardContent from "@material-ui/core/CardContent";
import OrderItem from "./OrderItem";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  content: {
    display: "flex",
    flexDirection: "row",
  },
  order_info: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  order_item: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
});

const History = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography variant="caption" display="block" gutterBottom></Typography>
        <div className={classes.order_info}>
          <Typography color="textSecondary" variant="overline" gutterBottom>
            Order ID #123-456
          </Typography>
          <div className={classes.order_info}>
            <Typography
              className={classes.order_id}
              color="textSecondary"
              variant="caption"
              gutterBottom
            >
              Mar 23, 2020
            </Typography>
            <Typography
              className={classes.order_id}
              color="textSecondary"
              variant="caption"
              gutterBottom
            >
              Paid by Credit Card, ends with 5018
            </Typography>
          </div>
        </div>
        <div className={classes.order_item}>
          <OrderItem />
        </div>
        <div className={classes.order_info}>
          <Typography color="textSecondary" variant="caption">
            Delivered on Mar 24, 2020
          </Typography>
          <Typography
            className={classes.order_id}
            color="textSecondary"
            variant="subtitle1"
          >
            RM XX.XX
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default History;
