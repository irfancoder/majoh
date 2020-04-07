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

// const useStyles = makeStyles(() => ({
//   title: {
//     fontWeight: 500
//   }
// }));

const Order = ({ open, handleDrawer }) => {
  return (
    <SwipeableDrawer
      anchor={anchor}
      open={open}
      onClose={handleDrawer(false)}
      onOpen={handleDrawer(true)}
    >
      <Container>
        <Typography variant="h5">My Orders</Typography>
        <OrderList />
        <DeliveryAddress />
        <PhoneNumber />
        <DeliveryTimeDate />
        <PaymentMethod />

        {/* <PayButton
          variant="contained"
          color="primary"
          disableElevation
          size="large"
        >
          pay
        </PayButton> */}
      </Container>
    </SwipeableDrawer>
  );
};

export default Order;
