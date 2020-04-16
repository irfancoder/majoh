import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";

/*
  A typical customer object to be passed to stripe checkout 
  const obj = {
      currency: "myr",
      quantity: 3,
      amount: 15000,
      name: "nasi rendang",
      desc: "good all stuff", 
      imageurl: "https://i.pinimg.com/originals/ca/46/e0/ca46e012af90c5911733e3b0034ca385.jpg",
      customerEmail: "marcosjconcon@gmail.com",
  }

  Use as a component
   <StripeComponent orders= {obj}/>

*/
function CashDelivery({total, orders}){
    const redirect = () => {
        fetch(
        "https://us-central1-majoh-8eea2.cloudfunctions.net/payCashOnDelivery",
            {
                method: "POST",
                body: JSON.stringify(orders)
            }
        ).then((response) =>{
        return response.json()
        })
    }

    return (
        <Button
          variant="contained"
          color="primary"
          style={{ width: "100%", marginTop: "1em" }}
          onClick={redirect}
        >
          COD {total ? "(RM" + total + ")" : ""}
        </Button>
      );
}
function StripeComponent({ total, orders }) {
  //const stripe =   window.Stripe("pk_test_TTPQooORfZwk6rmGHLX7TKzh00W4AogtnU");
  const redirect = () => {
    let sessionId;
    const stripe = window.Stripe("pk_test_TTPQooORfZwk6rmGHLX7TKzh00W4AogtnU");
    fetch(
      "https://us-central1-majoh-8eea2.cloudfunctions.net/createOrderAndSession",
      {
        method: "POST",
        // Adding the order data to payload
        body: JSON.stringify(orders),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Getting the session id from firebase function
        var body = JSON.parse(data.body);
        return (sessionId = body.sessionId);
      })
      .then((sessionId) => {
        // Redirecting to payment form page
        stripe
          .redirectToCheckout({
            sessionId: sessionId,
          })
          .then(function (result) {
            console.log(result.error.message);
          });
      });
  };

  return (
    <Button
      variant="contained"
      color="primary"
      style={{ width: "100%", marginTop: "1em" }}
      onClick={redirect}
    >
      Checkout {total ? "(RM" + total + ")" : ""}
    </Button>
  );
}

export default CashDelivery;
