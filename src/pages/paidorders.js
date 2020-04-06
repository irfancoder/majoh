import React from "react";
import OrderEntry from "../components/PAIDORDER/OrderEntry";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyle = makeStyles({
  root: {
    maxWidth: "140vh",
    margin: "auto",
  },
});

const PaidOrders = () => {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Typography variant="h6">Current Order</Typography>
      <OrderEntry />
      <Typography variant="h6">Order History</Typography>
      <OrderEntry />
    </div>
  );
};

export default PaidOrders;
