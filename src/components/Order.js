import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Typography from "@material-ui/core/Typography";
import OrderList from "./ORDER/OrderList";
import DeliveryAddress from "./ORDER/DeliveryAddress";
import DeliveryTimeDate from "./ORDER/DeliveryTimeDate";
import PhoneNumber from "./ORDER/PhoneNumber";
import PaymentMethod from "./ORDER/PaymentMethod";
import Button from "@material-ui/core/Button";
import { OrderConsumer } from "../utils/context";
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

const Order = ({ open, handleDrawer }) => {
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
              <DeliveryTimeDate />
              <PaymentMethod />

              <PayButton
                variant="contained"
                color="primary"
                disableElevation
                size="large"
                onClick={context.addOrder}
              >
                pay
              </PayButton>
            </Container>
          </SwipeableDrawer>
        );
      }}
    </OrderConsumer>
  );
};

export default Order;
