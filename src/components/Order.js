import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Typography from "@material-ui/core/Typography";
import OrderList from "./ORDER/OrderList";
import DeliveryAddress from "./ORDER/DeliveryAddress";
import DeliveryTimeDate from "./ORDER/DeliveryTimeDate";
import PhoneNumber from "./ORDER/PhoneNumber";

import Button from "@material-ui/core/Button";
import { OrderConsumer } from "../utils/context";
import StripeButton from "./StripeInterface";

import { useFirestoreDocData, useFirestore, SuspenseWithPerf } from "reactfire";
import { isUserLoggedIn } from "../utils";
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

const obj = {
  currency: "myr",
  quantity: 3,
  amount: 15000,
  name: "nasi rendang",
  desc: "good all stuff",
  imageurl:
    "https://i.pinimg.com/originals/ca/46/e0/ca46e012af90c5911733e3b0034ca385.jpg",
  customerEmail: "marcosjconcon@gmail.com",
};

const Order = ({ open, handleDrawer }) => {
  const [deliveryDate, setDeliveryDate] = useState("");

  const handleSetDate = (date) => {
    setDeliveryDate(date.toLocaleString().split(",")[0]);
  };

  const Stripe = ({ context }) => {
    const userRef = useFirestore()
      .collection("stripe_customers")
      .doc(isUserLoggedIn().uid);
    const userData = useFirestoreDocData(userRef);

    const purchaseOrder = {
      currency: "myr",
      quantity: 1,
      amount: 20000,
      name: "nasi rendang",
      desc: "good all stuff",
      imageurl:
        "https://i.pinimg.com/originals/ca/46/e0/ca46e012af90c5911733e3b0034ca385.jpg",
      customerEmail: userData.email,
      metadata: {
        // order: context.order,
        // payment: context.invoice,
        test: "test",
        // customer: userData,
      },
    };

    return <StripeButton orders={purchaseOrder} />;
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
              <Typography variant="h5">My Orders</Typography>
              <OrderList order={context.order} />
              <DeliveryAddress />
              <PhoneNumber />
              <DeliveryTimeDate handleSetDate={handleSetDate} />

              {isUserLoggedIn() ? (
                <SuspenseWithPerf
                  fallback={<p>loading user info...</p>}
                  traceId={"load-burrito-status"}
                >
                  <Stripe context={context} />
                </SuspenseWithPerf>
              ) : (
                <StripeButton disabled />
              )}
            </Container>
          </SwipeableDrawer>
        );
      }}
    </OrderConsumer>
  );
};

export default Order;
