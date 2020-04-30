import React, { useState } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Typography from "@material-ui/core/Typography";
import OrderList from "./ORDER/OrderList";
import DeliveryAddress from "./ORDER/DeliveryAddress";
import DeliveryTimeDate from "./ORDER/DeliveryTimeDate";
import PhoneNumber from "./ORDER/PhoneNumber";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { OrderConsumer } from "../utils/contextbazaar";
import StripeButton from "./StripeInterface";
import CloseIcon from "@material-ui/icons/Close";
import dimensions from "../styles/dimensions";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
// import ModalCheckout from "../components/ORDER/ModalCheckout"; (Majoh)
import ModalCheckout from "../components/BAZAAR/BazaarCheckout";

import { useFirestoreDocData, useFirestore, SuspenseWithPerf } from "reactfire";
import { isUserLoggedIn, getUserAddress } from "../utils";

import styled from "styled-components";

const anchor = "right";
const Container = styled.div`
  width: 600px;
  box-sizing: border-box;
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    width: 100%;
  }
`;

const createPurchaseOrder = (order_list, userData, date, invoice) => {
  const purchaseOrder = {
    metadata: {
      deliveryDate: date.toLocaleString().split(",")[0],
      deliveryAddress: getUserAddress(
        userData.street,
        userData.city,
        userData.postcode,
        userData.state
      ),
      phoneNo: userData.phone,
      Name: userData.name,
      uID: userData.uid,
      customerEmail: userData.email,
    },
    display_items: createBazaarOrderItem(order_list, invoice) /**(Bazaar) */,
    /* (Majoh) order_items: createOrderItem(order_list, invoice), */
  };

  return purchaseOrder;
};
/** Arranging to Stripe's configuration*/
const createOrderItem = (order_list, invoice) => {
  let newList = [];
  order_list.forEach((order) => {
    let item = {
      currency: "myr",
      quantity: order.qty,
      amount: order.price * 100,
      name: order.item,
    };
    newList.push(item);
  });

  let service = {
    currency: "myr",
    quantity: 1,
    amount: invoice * 100,
    name: "Delivery service",
  };
  newList.push(service);

  return newList;
};
/** Arranging to BazaarCoD configuration*/
const createBazaarOrderItem = (order_list, invoice) => {
  let newList = [];
  order_list.forEach((order) => {
    let item = {
      currency: "myr",
      quantity: order.qty,
      amount: order.price * 100,
      name: order.item,
      vendor: order.vendor,
    };
    newList.push(item);
  });

  // let service = {
  //   currency: "myr",
  //   quantity: 1,
  //   amount: invoice * 100,
  //   name: "Service charge",
  // };
  // newList.push(service);

  return newList;
};

const Order = ({ open, handleDrawer }) => {
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const handleSetDate = (date) => {
    setDeliveryDate(date);
  };

  const Checkout = ({ context, tag }) => {
    const userRef = useFirestore()
      .collection("stripe_customers")
      .doc(isUserLoggedIn().uid);
    const userData = useFirestoreDocData(userRef);

    if (tag === "stripe") {
      if (!userData.street) {
        return (
          <Button
            variant="contained"
            style={{ width: "100%", marginTop: "1em" }}
            disabled
          >
            Checkout
          </Button>
        );
      } else if (context.invoice.subtotal <= 1.5) {
        return (
          <Button
            variant="contained"
            style={{ width: "100%", marginTop: "1em" }}
            disabled
          >
            Card / Online Banking
          </Button>
        );
      } else
        return (
          <Button
            variant="contained"
            style={{ width: "100%", marginTop: "1em" }}
            disabled
          >
            Card / Online Banking
          </Button>
          /** Uncomment when the BAZAAR is over */
          // <StripeButton
          //   total={context.invoice.total}
          //   disabled
          //   orders={createPurchaseOrder(
          //     context.order,
          //     userData,
          //     deliveryDate,
          //     Number(context.invoice.serviceCharge)
          //   )}
          //   setLoading={setLoading}
          // />
        );
    } else {
      if (!userData.street) {
        return (
          <Button
            variant="contained"
            style={{ width: "100%", marginTop: "1em" }}
            disabled
          >
            Cash on Delivery (Isi alamat)
          </Button>
        );
      } else if (context.invoice.subtotal <= 1.5) {
        return (
          <Button
            variant="contained"
            style={{ width: "100%", marginTop: "1em" }}
            disabled
          >
            Cash on Delivery (Pilih order)
          </Button>
        );
      } else
        return (
          <ModalCheckout
            total={context.invoice.total}
            orders={createPurchaseOrder(
              context.order,
              userData,
              deliveryDate,
              Number(context.invoice.serviceCharge)
            )}
          />
        );
    }
  };

  return (
    <OrderConsumer>
      {(context) => {
        return (
          <SwipeableDrawer
            anchor={anchor}
            open={open}
            onClose={handleDrawer(false)}
            onOpen={handleDrawer(true)}
          >
            <Container>
              <IconButton
                aria-label="delete"
                style={{ alignSelf: "flex-start" }}
                onClick={handleDrawer(false)}
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h5" style={{ paddingBottom: "0.5em" }}>
                My Orders
              </Typography>
              <OrderList order={context.order} />
              <DeliveryAddress handleDrawer={handleDrawer} />
              <PhoneNumber handleDrawer={handleDrawer} />
              <DeliveryTimeDate
                date={deliveryDate}
                handleSetDate={handleSetDate}
              />
              <Grid container spacing={1}>
                {loading ? (
                  <div>
                    <Typography
                      style={{ textAlign: "center" }}
                      variant="caption"
                    >
                      Bringing you to checkout...
                    </Typography>
                    <LinearProgress
                      style={{ marginBotton: "1em", width: "100%" }}
                    />
                  </div>
                ) : (
                  <LinearProgress style={{ width: "0" }} />
                )}
                <Grid item md={6}>
                  {isUserLoggedIn() ? (
                    <SuspenseWithPerf
                      fallback={<p>loading user info...</p>}
                      traceId={"load-burrito-status"}
                    >
                      <Checkout context={context} tag="cod" />
                    </SuspenseWithPerf>
                  ) : (
                    <Button
                      variant="contained"
                      style={{ width: "100%", marginTop: "1em" }}
                      disabled
                    >
                      Cash on Delivery
                    </Button>
                  )}
                </Grid>
                <Grid item md={6}>
                  {isUserLoggedIn() ? (
                    <SuspenseWithPerf
                      fallback={<p>loading user info...</p>}
                      traceId={"load-burrito-status"}
                    >
                      <Checkout context={context} tag="stripe" />
                    </SuspenseWithPerf>
                  ) : (
                    <Button
                      variant="contained"
                      style={{ width: "100%", marginTop: "1em" }}
                      disabled
                    >
                      Card / Online Banking
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Container>
          </SwipeableDrawer>
        );
      }}
    </OrderConsumer>
  );
};

export default Order;
