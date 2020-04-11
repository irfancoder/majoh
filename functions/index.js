<<<<<<< HEAD
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
const functions = require('firebase-functions');
=======
const admin = require("firebase-admin");
const functions = require("firebase-functions");
>>>>>>> 9b81f0017a2aef01e38e5bfc65a757196bb5f37b
// We should install required packages (stripe, body-parser) using npm install inside /functions/ folder
const bodyParser = require("body-parser");
const cors = require("cors")({ origin: true });
const express = require("express");
const stripe = require("stripe")(functions.config().stripe.token);
var app = admin.initializeApp(functions.config().firebase);
let db = admin.firestore();

//const { MessengerClient } = require('messaging-api-messenger');

// Secret Key from Stripe Dashboard
// The function for sending responses
function send(res, code, body) {
  res.send({
    statusCode: code,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(body),
  });
}

const options = {
  service: 'gmail',
  auth: {
    user: "sprouty.co@gmail.com",
    pass: "Sprouty123"
  }
}

const time = () => {
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
  return dateTime
}


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

// Our app has to use express
const createOrderAndSessionApp = express();
// Our app has to use cors
createOrderAndSessionApp.use(cors);
// The function that get data from front-end and create a payment session
function createOrderAndSession(req, res) {
  const body = JSON.parse(req.body);
  // Creating session data from payload
  /*
  const currency = body.currency;
  const quantity = body.quantity;
  const amount = body.amount;
  const name = body.name;
  const description = body.desc;
  let images = [];
  images[0] = body.imageurl;
  const customerEmail = body.customerEmail;
  const metaData = body.metadata
  */
  // Also we can process the order data, e.g. save it to firebase database
  // Creating session using the data above
  stripe.checkout.sessions
    .create({
      payment_method_types: ["card", "fpx"],
      line_items: body.order_items,
      customer_email: body.customer_email,
      metadata: body.metadata,
      /* Redirect them to these URLS */
      success_url: "https://majoh-8eea2.web.app/",
      cancel_url: "https://majoh-8eea2.web.app/",
    })
    .then((session) => {
      // Getting the session id
      var sessionId = session.id;
      // Here we can do something with the session id, e.g. add it to the order data in firebase database
      // Sending the session id to front-end
      send(res, 200, {
        sessionId: sessionId,
      });
      return;
    })
    .catch((error) => {
      console.log(error);
      return;
    });
}
// Creating a route
createOrderAndSessionApp.post("/", (req, res) => {
  try {
    createOrderAndSession(req, res);
  } catch (e) {
    console.log(e);
    send(res, 500, {
      error: `The server received an unexpected error. Please try again and contact the site admin if the error persists.`,
    });
  }
});
// Exporting our http function
exports.createOrderAndSession = functions.https.onRequest(
  createOrderAndSessionApp
);

const endpointSecret = "whsec_t2vF9aXdSvhdxu6JbGgTFARQt6Ms5OUt";
// Our app has to use express
const processTheOrderApp = express();
<<<<<<< HEAD
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
  let batch = db.batch();
  let timeID = time();
  if (event.type === 'checkout.session.completed') {
    const orderInfo = event.data.object;
    // Test, here we can proccess the order data after successfull payment
    let customerRef = db.collection('stripe_customers').doc(orderInfo.customer).collection('paid_orders').doc();
    let ownRef = db.collection('success_orders').doc(timeID);
    batch.set(customerRef, {orderInfo});
    batch.set(ownRef, {orderInfo});
    console.log(orderInfo);
    //sendMail(session);

    const mailOptions ={
      from: "sprouty.co@gmail.com", // sender address
      to: orderInfo.customer_email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "hi", // plain text body
      html: "<b>Hello world?</b>" // html body
      }
  
      let transporter = nodemailer.createTransport(options);
      transporter.sendMail(mailOptions, function(err, info){
        if(err)
        console.log(err)
      else
        console.log(info);
      });
  
  }
  // Return a response to acknowledge receipt of the event
  return batch.commit().then(function () {
    response.json({received: true});
  })
});
// Exporting our http function
exports.processTheOrder = functions.https.onRequest(processTheOrderApp);

=======
processTheOrderApp.post(
  "/",
  bodyParser.raw({ type: "application/json" }),
  (request, response) => {
    const sig = request.headers["stripe-signature"];
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        request.rawBody,
        sig,
        endpointSecret
      );
    } catch (err) {
      console.log(err);
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }
  }
);
// Exporting our http function
exports.processTheOrder = functions.https.onRequest(processTheOrderApp);

// When a user is created, register them with Stripe
exports.createStripeCustomer = functions.auth.user().onCreate(async (user) => {
  console.log(user);
  const customer = await stripe.customers.create({ email: user.email });
  console.log(customer.id);

  const stripe_customer = {
    stripeId: customer.id,
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
>>>>>>> 9b81f0017a2aef01e38e5bfc65a757196bb5f37b
