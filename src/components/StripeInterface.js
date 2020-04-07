
import React from 'react';
import firebase from '../fire';
//var stripe = require('stripe')('pk_test_TTPQooORfZwk6rmGHLX7TKzh00W4AogtnU');
//const stripe = require('stripe')(functions.config().stripe.token);
var stripe = require('stripe')('sk_test_nozLmYBJO6jnsYSzz1aAY2ob00jGWsyG3H');

const SubmitNewCreditCard = ({cardDetails}) => {
    /*
    const [cardDetails, setCardDetails] = React.useState({
        number: "",
        exp_month: 0,
        exp_year:0,
        cvc:""
    });
    */
   let paymentIntent;
   (async () => {
    paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,
      currency: 'myr',
      payment_method_types: ['card'],
      receipt_email: 'jenny.rosen@example.com',
    });
  })();
  console.log(paymentIntent)
}

export default SubmitNewCreditCard;