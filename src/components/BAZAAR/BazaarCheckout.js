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
  const [disabled, setDisabled] = useState(false);

  const redirect = () => {
    if (disabled) {
      return;
    }
    setDisabled(true);
    // Send
    fetch("https://us-central1-majoh-8eea2.cloudfunctions.net/payBazaarCoD", {
      method: "POST",
      body: JSON.stringify(orders),
    }).then((response) => {
      window.location = "/paidorders";
      return response.json();
    });
  };

  const handleOpen = (scrollType) => {
    setOpen(true);
    console.log(orders);
    // var results = orders.display_items.reduce(function (results, org) {
    //   (results[org.vendor.uid] = results[org.vendor.uid] || []).push(org);
    //   return results;
    // }, {});

    // let vendorTicket = orders;
    // vendorTicket.display_items = results;

    // let i;
    // Object.keys(results).map((key, index) => {
    //   var sendVendorText = "";
    //   for (i = 0; i < results[key].length; i++) {
    //     sendVendorText +=
    //       results[key][i].quantity + "   x   " + results[key][i].name + "\n";
    //     console.log(sendVendorText, index);
    //   }

    //   return console.log(sendVendorText);
    // });

    // console.log(vendorTicket);
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
          {orders.display_items.map((item, index) => {
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
          <Button onClick={redirect} disabled={disabled} color="primary">
            {disabled ? "Processing order..." : `Confirm (RM ${total})`}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
