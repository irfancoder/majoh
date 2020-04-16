import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Typography from "@material-ui/core/Typography";
import OrderList from "./ORDER/OrderList";
import DeliveryAddress from "./ORDER/DeliveryAddress";
import DeliveryTimeDate from "./ORDER/DeliveryTimeDate";
import PhoneNumber from "./ORDER/PhoneNumber";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { OrderConsumer } from "../utils/context";
import StripeButton from "./StripeInterface";
import CloseIcon from "@material-ui/icons/Close";
import dimensions from "../styles/dimensions";
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ModalCheckout from "../components/ORDER/ModalCheckout"

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

const createPurchaseOrder = (order_list, userData, date) => {
  console.log(order_list);
  const purchaseOrder = {
    customer_email: userData.email,
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
    },
    order_items: createOrderItem(order_list),
  };

  return purchaseOrder;
};

const createOrderItem = (order_list) => {
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

  return newList;
};


const Order = ({ open, handleDrawer }) => {
  const [openModal, setOpenModal] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState(new Date());

  const handleSetDate = (date) => {
    setDeliveryDate(date);
  };

  const handleOpenModal= () => {
    setOpenModal(true);
    console.log("Pressed yes");
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const Stripe = ({ context }) => {
    const userRef = useFirestore()
      .collection("stripe_customers")
      .doc(isUserLoggedIn().uid);
    const userData = useFirestoreDocData(userRef);

    console.log(createPurchaseOrder(context.order, userData, deliveryDate));

    if (!userData.street) {
      return (
        <Typography variant="body1">
          Please insert your details before checkout
        </Typography>
      );
    } else
      return (
        <StripeButton
          total={context.invoice.total}
          orders={createPurchaseOrder(context.order, userData, deliveryDate)}
        />
      );
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
              <DeliveryAddress />
              <PhoneNumber />
              <DeliveryTimeDate
                date={deliveryDate}
                handleSetDate={handleSetDate}
              />
              <Grid container spacing ={1}>
              <Grid item md={6}>
              {isUserLoggedIn() ? (
                <SuspenseWithPerf
                  fallback={<p>loading user info...</p>}
                  traceId={"load-burrito-status"}
                >
                  <Stripe context={context} />
                </SuspenseWithPerf>
              ) : (
                <ModalCheckout></ModalCheckout>
              )}
              </Grid>
              <Grid item md={6}>
              {isUserLoggedIn() ? (
                <SuspenseWithPerf
                  fallback={<p>loading user info...</p>}
                  traceId={"load-burrito-status"}
                >
                  <Stripe context={context} />
                </SuspenseWithPerf>
              ) : (
                <Button
                  variant="contained"
                  style={{ width: "100%", marginTop: "1em" }}
                  disabled
                >
                 Stripe Checkout
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
