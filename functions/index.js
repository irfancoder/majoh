const admin = require("firebase-admin");
const functions = require("firebase-functions");
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
  stripe.checkout.sessions.create({
    payment_method_types: ['card', 'fpx'],
    line_items: body.order_items,
    customer_email: body.customer_email,
    metadata: body.metadata,
    /* Redirect them to these URLS */
    success_url: 'https://majoh-8eea2.web.app/',
    cancel_url: 'https://majoh-8eea2.web.app/',
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
);
// Exporting our http function
exports.processTheOrder = functions.https.onRequest(processTheOrderApp);
