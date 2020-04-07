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
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: "2em",
  },
});

const OrderItem = () => {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Typography variant="subtitle1">1 x</Typography>
      <div className={classes.order}>
        <Typography variant="caption">BREAKFAST</Typography>
        <Typography variant="subtitle1">Nasi Lemak</Typography>
      </div>
    </div>
  );
};

export default OrderItem;
