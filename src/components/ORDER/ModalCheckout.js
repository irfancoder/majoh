import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography,
} from "@material-ui/core";

import OrderItem from "../PAIDORDER/OrderItem";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  sectionHeader: {
    marginTop: "1em",
  },
}));

export default function ModalCheckout({ total, orders }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const redirect = () => {
    fetch(
      "https://us-central1-majoh-8eea2.cloudfunctions.net/payCashOnDelivery",
      {
        method: "POST",
        body: JSON.stringify(orders),
      }
    ).then((response) => {
      window.location = "/paidorders";
      return response.json();
    });
  };

  const handleOpen = (scrollType) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        color="primary"
        style={{ width: "100%", marginTop: "1em" }}
        onClick={handleOpen}
      >
        Cash on delivery
      </Button>

      <Dialog
        closeAfterTransition
        open={open}
        onClose={handleClose}
        scroll={scroll}
      >
        <DialogTitle id="scroll-dialog-title">
          Review Cash on Delivery Checkout
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <Typography
            className={classes.sectionHeader}
            variant="body1"
            color="textSecondary"
            gutterBottom
          >
            Orders
          </Typography>
          {orders.order_items.map((item, index) => {
            return <OrderItem item={item} key={index} />;
          })}
          <Typography
            className={classes.sectionHeader}
            variant="body1"
            color="textSecondary"
            gutterBottom
          >
            Address
          </Typography>
          <Typography variant="body2" component="p">
            {orders.metadata.deliveryAddress}
          </Typography>
          <Typography
            className={classes.sectionHeader}
            variant="body1"
            color="textSecondary"
            gutterBottom
          >
            Delivery Date
          </Typography>
          <Typography variant="body2" component="p">
            {orders.metadata.deliveryDate}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={redirect} color="primary">
            Confirm {total ? "(RM" + total + ")" : ""}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
