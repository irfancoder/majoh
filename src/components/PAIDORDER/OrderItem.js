import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyle = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    paddingLeft: "2em",
    paddingRight: "2em",
  },
  order: {
    paddingLeft: "2em",
  },
});

const OrderItem = ({ item }) => {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Typography variant="subtitle1">{item.quantity} x</Typography>

      <Typography className={classes.order} variant="subtitle1">
        {item.custom.name}
      </Typography>
    </div>
  );
};

export default OrderItem;
