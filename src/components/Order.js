import React, { useState } from "react";
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
import LinearProgress from "@material-ui/core/LinearProgress";

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
    order_items: createOrderItem(order_list, invoice),
  };

  console.log(purchaseOrder);
  return purchaseOrder;
};

const createOrderItem = (order_list, invoice) => {
  let newList = [];
  console.log(invoice);
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
    name: "Service charge",
  };
  newList.push(service);

  return newList;
};

const Order = ({ open, handleDrawer }) => {
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const handleSetDate = (date) => {
    setDeliveryDate(date);
  };

  const Stripe = ({ context }) => {
    const userRef = useFirestore()
      .collection("stripe_customers")
      .doc(isUserLoggedIn().uid);
    const userData = useFirestoreDocData(userRef);

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
          Checkout
        </Button>
      );
    } else
      return (
        <StripeButton
          total={context.invoice.total}
          orders={createPurchaseOrder(
            context.order,
            userData,
            deliveryDate,
            Number(context.invoice.serviceCharge)
          )}
          setLoading={setLoading}
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
                  <Stripe context={context} />
                </SuspenseWithPerf>
              ) : (
                <div>
                  <Button
                    variant="contained"
                    style={{ width: "100%", marginTop: "1em" }}
                    disabled
                  >
                    Checkout
                  </Button>
                </div>
              )}
            </Container>
          </SwipeableDrawer>
        );
      }}
    </OrderConsumer>
  );
};

export default Order;
