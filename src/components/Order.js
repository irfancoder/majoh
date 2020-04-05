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



<script>
(function() {
  let stripe = Stripe('pk_test_TTPQooORfZwk6rmGHLX7TKzh00W4AogtnU');

  var checkoutButton = document.getElementById('checkout-button-sku_H2htkJOHZ6w8hG');
  checkoutButton.addEventListener('click', function () {
    // When the customer clicks on the button, redirect
    // them to Checkout.
    stripe.redirectToCheckout({
      items: [{sku: 'sku_H2htkJOHZ6w8hG', quantity: 1}],

      // Do not rely on the redirect to the successUrl for fulfilling
      // purchases, customers may not always reach the success_url after
      // a successful payment.
      // Instead use one of the strategies described in
      // https://stripe.com/docs/payments/checkout/fulfillment
      successUrl: 'https://your-website.com/success',
      cancelUrl: 'https://your-website.com/canceled',
    })
    .then(function (result) {
      if (result.error) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer.
        var displayError = document.getElementById('error-message');
        displayError.textContent = result.error.message;
      }
    });
  });
})();
</script>

      </Container>
    </SwipeableDrawer>
  );
};

export default Order;
