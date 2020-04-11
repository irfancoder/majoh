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

import { useFirestoreDocData, useFirestore, SuspenseWithPerf } from "reactfire";
import { isUserLoggedIn, getUserAddress } from "../utils";
// import { makeStyles } from "@material-ui/core/styles";

import styled from "styled-components";

const anchor = "right";
const Container = styled.div`
  width: 600px;
  box-sizing: border-box;
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PayButton = withStyles({
  root: {
    width: "100%",
  },
})(Button);

const createPurchaseOrder = (order_list, userData, date) => {
  console.log(order_list);
  const purchaseOrder = {
    customer_email: userData.email,
    metadata: {
      deliveryDate: date,
      deliveryAddress: getUserAddress(
        userData.street,
        userData.city,
        userData.postcode,
        userData.state
      ),
      customerPhone: userData.phone,
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
  const [deliveryDate, setDeliveryDate] = useState(
    new Date().toLocaleString().split(",")[0]
  );

  const handleSetDate = (date) => {
    setDeliveryDate(date.toLocaleString().split(",")[0]);
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
                  Checkout
                </Button>
              )}
            </Container>
          </SwipeableDrawer>
        );
      }}
    </OrderConsumer>
  );
};

export default Order;
