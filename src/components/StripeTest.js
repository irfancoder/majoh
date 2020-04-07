import React from "react";
import {loadStripe} from '@stripe/stripe-js';
import { Button } from "@material-ui/core";
//const stripe = await loadStripe('pk_test_TTPQooORfZwk6rmGHLX7TKzh00W4AogtnU');

class StripeTest extends React.Component {
  componentDidMount() {
    // Publishable Key from Stripe Dashboard
    const stripe =   window.Stripe("pk_test_TTPQooORfZwk6rmGHLX7TKzh00W4AogtnU");
    const paymentBtn = document.getElementById("stripe-payment-btn");
    let sessionId;
    paymentBtn.addEventListener("click", () => {
      let orderData = {
      currency: "myr",
      quantity: 1,
      amount: 1000,
      name: "Some product",
      description: "Product description",
      image: "https://i.pinimg.com/originals/ca/46/e0/ca46e012af90c5911733e3b0034ca385.jpg",
      customerEmail: "marcosjconcon@gmail.com",
      clientId: "12345"
    }
    // Url to Firebase function
    fetch("https://us-central1-majoh-8eea2.cloudfunctions.net/createOrderAndSession", {
      method: "POST",
      // Adding the order data to payload
      body: JSON.stringify(orderData)
      }).then(response => {
        return response.json();
      }).then(data => {
        // Getting the session id from firebase function
        var body = JSON.parse(data.body);
        return sessionId = body.sessionId;
      }).then(sessionId => {
        // Redirecting to payment form page
        stripe.redirectToCheckout({
          sessionId: sessionId
        }).then(function (result) {
          console.log(result.error.message)
        });
      });
    });
  }
  render() {
    return <Button id="stripe-payment-btn">Checkout with Stripe</Button>
  }
}
export default StripeTest;
