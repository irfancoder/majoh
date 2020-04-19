import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyle = makeStyles({
  root: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: "2em",
  },
  order: {
    paddingLeft: "2em",
    paddingRight: "1em",
    flexGrow: 2,
  },
  price: {
    marginRight: "2em",
  },
});

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}
const OrderItem = ({ item }) => {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Typography variant="subtitle1">{item.quantity} x</Typography>

      <Typography className={classes.order} variant="subtitle1">
        {item.custom ? item.custom.name : item.name}
      </Typography>
      <Typography className={classes.price} variant="subtitle1">
        RM {ccyFormat((item.amount * item.quantity) / 100)}
      </Typography>
    </div>
  );
};

export default OrderItem;
