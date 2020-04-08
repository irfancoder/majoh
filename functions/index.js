<<<<<<< HEAD
const functions = require('firebase-functions');
// We should install required packages (stripe, body-parser) using npm install inside /functions/ folder
const bodyParser = require('body-parser');
const cors = require('cors')({origin: true});
const express = require('express');
// Secret Key from Stripe Dashboard
const stripe = require('stripe')('sk_test_nozLmYBJO6jnsYSzz1aAY2ob00jGWsyG3H');
// The function for sending responses
function send(res, code, body) {
  res.send({
    statusCode: code,
    headers: {'Access-Control-Allow-Origin': '*'},
    body: JSON.stringify(body),
  });
}
// Our app has to use express
const createOrderAndSessionApp = express();
// Our app has to use cors
createOrderAndSessionApp.use(cors);
// The function that get data from front-end and create a payment session
function createOrderAndSession(req, res) {
  const body = JSON.parse(req.body);
  // Creating session data from payload
  const currency = body.currency;
  const quantity = body.quantity;
  const amount = body.amount;
  const name = body.name;
  const description = body.description;
  let images = [];
  images[0] = body.image;
  const customerEmail = body.customerEmail;
  const clientId = body.clientId;
  // Also we can process the order data, e.g. save it to firebase database
  // Creating session using the data above
  stripe.checkout.sessions.create({
    payment_method_types: ['card', 'fpx'],
    line_items: [{
      name: name,
      description: description,
      images: images,
      amount: amount,
      currency: currency,
      quantity: quantity,
    }],
    client_reference_id: clientId,
    customer_email: customerEmail,
    // We will add the only app page for simplicity
    success_url: 'http://localhost:3000/#/',
    cancel_url: 'https://localhost:3000/#/',
  }).then(session => {
  // Getting the session id
  var sessionId = session.id;
  // Here we can do something with the session id, e.g. add it to the order data in firebase database
  // Sending the session id to front-end
  send(res, 200, {
    sessionId: sessionId
  });
  return;
  }).catch(error => {
    console.log(error);
    return;
  });
}
// Creating a route
createOrderAndSessionApp.post('/', (req, res) => {
  try {
    createOrderAndSession(req, res);
  } catch(e) {
    console.log(e);
    send(res, 500, {
      error: `The server received an unexpected error. Please try again and contact the site admin if the error persists.`,
    });
  }
});
// Exporting our http function
exports.createOrderAndSession = functions.https.onRequest(createOrderAndSessionApp);


const endpointSecret = "whsec_t2vF9aXdSvhdxu6JbGgTFARQt6Ms5OUt";
// Our app has to use express
const processTheOrderApp = express();
processTheOrderApp.post('/', bodyParser.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(request.rawBody, sig, endpointSecret);
  } catch (err) {
    console.log(err);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }
  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // Here we can proccess the order data after successfull payment
    // (e.g. change payment status in Firebase Database and call another function)
  }
  // Return a response to acknowledge receipt of the event
  response.json({received: true});
});
// Exporting our http function
exports.processTheOrder = functions.https.onRequest(processTheOrderApp);
=======
"use strict";
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const stripe = require("stripe")(functions.config().stripe.token);
const currency = functions.config().stripe.currency || "USD";
const { Logging } = require("@google-cloud/logging");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// [START chargecustomer]
// Charge the Stripe customer whenever an amount is created in Cloud Firestore
exports.createStripeCharge = functions.firestore
  .document("stripe_customers/{userId}/charges/{id}")
  .onCreate(async (snap, context) => {
    const val = snap.data();
    try {
      // Look up the Stripe customer id written in createStripeCustomer
      const snapshot = await admin
        .firestore()
        .collection(`stripe_customers`)
        .doc(context.params.userId)
        .get();
      const snapval = snapshot.data();
      const customer = snapval.customer_id;
      // Create a charge using the pushId as the idempotency key
      // protecting against double charges
      const amount = val.amount;
      const idempotencyKey = context.params.id;
      const charge = { amount, currency, customer };
      if (val.source !== null) {
        charge.source = val.source;
      }
      const response = await stripe.charges.create(charge, {
        idempotency_key: idempotencyKey,
      });
      // If the result is successful, write it back to the database
      return snap.ref.set(response, { merge: true });
    } catch (error) {
      // We want to capture errors and render them in a user-friendly way, while
      // still logging an exception with StackDriver
      console.log(error);
      await snap.ref.set({ error: userFacingMessage(error) }, { merge: true });
      return reportError(error, { user: context.params.userId });
    }
  });
// [END chargecustomer]]

// When a user is created, register them with Stripe
exports.createStripeCustomer = functions.auth.user().onCreate(async (user) => {
  console.log(user);
  const customer = await stripe.customers.create({ email: user.email });
  console.log(customer.id);

  const stripe_customer = {
    stripeAcc: customer,
    name: user.displayName,
    email: user.email,
    uid: user.uid,
  };

  return admin
    .firestore()
    .collection("stripe_customers")
    .doc(user.uid)
    .set(stripe_customer);
});

// Add a payment source (card) for a user by writing a stripe payment source token to Cloud Firestore
exports.addPaymentSource = functions.firestore
  .document("/stripe_customers/{userId}/tokens/{pushId}")
  .onCreate(async (snap, context) => {
    const source = snap.data();
    const token = source.token;
    if (source === null) {
      return null;
      // const intent = await stripe.paymentIntents.create({
      //   amount: 1099,
      //   currency: "myr",
      //   customer: customer.id,
      // });
    }

    try {
      const snapshot = await admin
        .firestore()
        .collection("stripe_customers")
        .doc(context.params.userId)
        .get();
      const customer = snapshot.data().customer_id;
      const response = await stripe.customers.createSource(customer, {
        source: token,
      });
      return admin
        .firestore()
        .collection("stripe_customers")
        .doc(context.params.userId)
        .collection("sources")
        .doc(response.fingerprint)
        .set(response, { merge: true });
    } catch (error) {
      await snap.ref.set({ error: userFacingMessage(error) }, { merge: true });
      return reportError(error, { user: context.params.userId });
    }
  });

// When a user deletes their account, clean up after them
exports.cleanupUser = functions.auth.user().onDelete(async (user) => {
  const snapshot = await admin
    .firestore()
    .collection("stripe_customers")
    .doc(user.uid)
    .get();
  const customer = snapshot.data();
  await stripe.customers.del(customer.customer_id);
  return admin
    .firestore()
    .collection("stripe_customers")
    .doc(user.uid)
    .delete();
});

// To keep on top of errors, we should raise a verbose error report with Stackdriver rather
// than simply relying on console.error. This will calculate users affected + send you email
// alerts, if you've opted into receiving them.
// [START reporterror]
function reportError(err, context = {}) {
  // This is the name of the StackDriver log stream that will receive the log
  // entry. This name can be any valid log stream name, but must contain "err"
  // in order for the error to be picked up by StackDriver Error Reporting.

  const logName = "errors";
  const log = Logging.log(logName);

  // https://cloud.google.com/logging/docs/api/ref_v2beta1/rest/v2beta1/MonitoredResource
  const metadata = {
    resource: {
      type: "cloud_function",
      labels: { function_name: process.env.FUNCTION_NAME },
    },
  };

  // https://cloud.google.com/error-reporting/reference/rest/v1beta1/ErrorEvent
  const errorEvent = {
    message: err.stack,
    serviceContext: {
      service: process.env.FUNCTION_NAME,
      resourceType: "cloud_function",
    },
    context: context,
  };

  // Write the error log entry
  return new Promise((resolve, reject) => {
    log.write(log.entry(metadata, errorEvent), (error) => {
      if (error) {
        return reject(error);
      }
      return resolve();
    });
  });
}
// [END reporterror]

// Sanitize the error message for the user
function userFacingMessage(error) {
  return error.type
    ? error.message
    : "An error occurred, developers have been alerted";
}

// const intent = await stripe.paymentIntents.create({
//   amount: 1099,
//   currency: "myr",
//   customer: customer.id,
// });
>>>>>>> d4088b0c6e26a07628c0defa1fa3ebe8703a577b
