const nodemailer = require("nodemailer");
const admin = require("firebase-admin");
const functions = require("firebase-functions");
// We should install required packages (stripe, body-parser) using npm install inside /functions/ folder
const bodyParser = require("body-parser");
const cors = require("cors")({ origin: true });
const express = require("express");
const stripe = require("stripe")(functions.config().stripe.token);
var app = admin.initializeApp(functions.config().firebase);
let db = admin.firestore();
var telegram = require("telegram-bot-api");
require("dotenv").config();
const Email = require("email-templates");
var uuid = require("uuid-random");
// const algoliasearch = require("algoliasearch");
// const algoliaFunctions = require("algolia-firebase-functions");

var api = new telegram({
  token: process.env.TELEGRAM_TOKEN,
});
// require("dotenv").load();
// var twilio = require("twilio");
var accountSid = process.env.TWILIO_SID; // Twilio Account SID
var authToken = process.env.TWILIO_TOKEN; // Twilio Auth Token
// console.log("AC3140e0f1ee0dc79a3e42352fdc0e7838", authToken);
var client = require("twilio")(
  "AC3140e0f1ee0dc79a3e42352fdc0e7838",
  "2516d0b9afd33e9eb86dc2506b925c74"
);

/*
const ALGOLIA_ID = "07CVJHF6V6";
const ALGOLIA_ADMIN_KEY = "5d01dfb41354dcccabde4967fc7e34d3";
const ALGOLIA_SEARCH_KEY = "d7ecf94667407705380df31a5e263040";
const ALGOLIA_INDEX_NAME = "test_search";

const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
exports.onDishCreated = functions.firestore
  .document("test_search/{noteId}")
  .onCreate((snap, context) => {
    // Get the note document
    const note = snap.data();

    // Add an 'objectID' field which Algolia requires
    note.objectID = context.params.noteId;

    // Write to the algolia index
    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.saveObject(note);
  });

const { MessengerClient } = require('messaging-api-messenger');
*/

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
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};

const time = () => {
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;
  return dateTime;
};

// When a user is created, register them with Stripe
/*
exports.createStripeCustomer = functions.auth.user().onCreate(async (user) => {
  console.log(user);
  const customer = await stripe.customers.create({ email: user.email });
  console.log(customer.id);
  console.log(user.uid)

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
*/
const whatsappNotifApp = express();
whatsappNotifApp.use(cors);
function whatsappNotif(req, res) {
  client.messages
    .create({
      mediaUrl: [
        "https://images.unsplash.com/photo-1545093149-618ce3bcf49d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
      ],
      from: "whatsapp:+14155238886",
      body: `It's taco time!`,
      to: "whatsapp:+15017122661",
    })
    .then((message) => console.log(message.sid));
  return res.send(200);
}

exports.whatsappNotif = functions.https.onRequest(whatsappNotifApp);

/* (Majoh) Cash on Delivery Checkout */
const payCashOnDeliveryApp = express();
payCashOnDeliveryApp.use(cors);
async function payCashOnDelivery(req, res) {
  const orderInfo = JSON.parse(req.body);
  orderInfo["display_items"] = orderInfo["order_items"];
  delete orderInfo.order_items;

  const idexample = uuid();
  const id = idexample.substr(idexample.length - 6);
  orderInfo.id = id;
  let timeID = time();
  let batch = db.batch();
  let customerRef = db
    .collection("stripe_customers")
    .doc(orderInfo.metadata.uID)
    .collection("paid_orders")
    .doc();
  let ownRef = db.collection("success_orders").doc(timeID);
  batch.set(customerRef, { orderInfo });
  batch.set(ownRef, { orderInfo });
  console.log(orderInfo);

  let total = 0;
  let sendCustomer = {};
  let sendVendor = "";
  let i;

  for (i = 0; i < orderInfo.display_items.length; i++) {
    total +=
      orderInfo.display_items[i].amount * orderInfo.display_items[i].quantity;
    sendCustomer[orderInfo.display_items[i].name] =
      orderInfo.display_items[i].quantity +
      "   x   " +
      "RM " +
      orderInfo.display_items[i].amount / 100;
    sendVendor +=
      orderInfo.display_items[i].quantity +
      "   x   " +
      orderInfo.display_items[i].name +
      "\n";
  }

  total = (total / 100).toFixed(2);

  let text =
    "Order ID: " +
    id +
    "\n" +
    "Payment Method: Cash on delivery\nOrders: \n" +
    sendVendor +
    "Total: " +
    "RM" +
    total +
    "\n" +
    "\nDelivery: \n" +
    "Nama - " +
    orderInfo.metadata.Name +
    "\n" +
    "Alamat - " +
    orderInfo.metadata.deliveryAddress +
    "\n" +
    "Telefon - " +
    orderInfo.metadata.phoneNo +
    "\n" +
    "Tarikh Delivery - " +
    orderInfo.metadata.deliveryDate;

  /* Twilio WhatsApp */
  client.messages
    .create({
      mediaUrl: [
        "https://images.unsplash.com/photo-1545093149-618ce3bcf49d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
      ],
      from: "whatsapp:+14155238886",
      body: text,
      to: "whatsapp:+60136887507",
    })
    .then((message) => console.log(message.sid));
  /* Telegram */
  api
    .sendMessage({
      chat_id: process.env.CHAT_ID,
      text: text,
    })
    .then(function (data) {
      console.log("Telegram message sent");
      console.log(sendCustomer);
    });
  /* Email */
  let transporter = nodemailer.createTransport(options);
  const email = new Email({
    message: {
      from: "sprouty.co@gmail.com",
      subject: "Your Majoh E-receipt",
    },
    // uncomment below to send emails in development/test env:
    // send: true
    transport: transporter,
  });

  email
    .send({
      template: "html",
      message: {
        to: orderInfo.metadata.customerEmail,
        cc: process.env.EMAIL_USER,
      },
      locals: {
        orderData: sendCustomer,
        orderID: id,
        orderTotal: total,
        address: orderInfo.metadata.deliveryAddress,
      },
    })
    .then((res) => {
      console.log("res.originalMessage", res.originalMessage);
    })
    .catch(console.error);

  try {
    await batch.commit();
    res.json({ received: true });
  } catch (error) {
    console.log(error);
    return;
  }
}
payCashOnDeliveryApp.post("/", (req, res) => {
  try {
    payCashOnDelivery(req, res);
  } catch (e) {
    console.log(e);
    send(res, 500, {
      error: `The server received an unexpected error. Please try again and contact the site admin if the error persists.`,
    });
  }
});

payCashOnDeliveryApp.post("/", (req, res) => {
  try {
    whatsappNotif(req, res);
  } catch (e) {
    console.log(e);
    send(res, 500, {
      error: `The server received an unexpected error. Please try again and contact the site admin if the error persists.`,
    });
  }
});

exports.payCashOnDelivery = functions.https.onRequest(payCashOnDeliveryApp);

/* (Bazaar) Cash on Delivery Checkout */
const payBazaarCoDApp = express();
payBazaarCoDApp.use(cors);

function payBazaarCoD(req, res) {
  const orderInfo = JSON.parse(req.body);

  const idexample = uuid();
  const id = idexample.substr(idexample.length - 6);
  orderInfo.id = id;

  let timeID = time();
  let batch = db.batch();
  let customerRef = db
    .collection("stripe_customers")
    .doc(orderInfo.metadata.uID)
    .collection("paid_orders")
    .doc(orderInfo.id);

  /* (Bazaar) Logs all orders inside 'bazaar_orderlogs collection' */
  let ownRef = db.collection("bazaar_orderlogs").doc(timeID);
  batch.set(customerRef, { orderInfo });
  batch.set(ownRef, { orderInfo });
  console.log(orderInfo);

  let total = 0;
  let sendCustomer = {};
  let i;

  let results = orderInfo.display_items.reduce(function (results, org) {
    (results[org.vendor.uid] = results[org.vendor.uid] || []).push(org);
    return results;
  }, {});

  for (i = 0; i < orderInfo.display_items.length; i++) {
    total +=
      orderInfo.display_items[i].amount * orderInfo.display_items[i].quantity;
    sendCustomer[orderInfo.display_items[i].name] =
      orderInfo.display_items[i].quantity +
      "   x   " +
      "RM " +
      orderInfo.display_items[i].amount / 100;
  }

  Object.keys(results).map((key, index) => {
    var sendVendorText = "";
    let totalVendor = 0;
    for (i = 0; i < results[key].length; i++) {
      totalVendor += results[key][i].amount * results[key][i].quantity;
      sendVendorText +=
        results[key][i].quantity + "   x   " + results[key][i].name + "\n";
    }
    let text =
      "Order ID: " +
      id +
      "\n" +
      "Payment Method: Cash on delivery\nOrders: \n" +
      sendVendorText +
      "Total: " +
      "RM " +
      (totalVendor / 100).toFixed(2) +
      "\n" +
      "\nDelivery: \n" +
      "Name - " +
      orderInfo.metadata.Name +
      "\n" +
      "Address - " +
      orderInfo.metadata.deliveryAddress +
      "\n" +
      "PhoneNo - " +
      orderInfo.metadata.phoneNo +
      "\n" +
      "Date - " +
      orderInfo.metadata.deliveryDate;

    /**  (Vendor) Notify each vendor involved inside the order through Telegram*/
    api
      .sendMessage({
        chat_id: results[key][0].vendor.telegramId,
        text: text,
      })
      .then(function (data) {
        console.log("Telegram message sent");
        console.log(sendCustomer);
      });

    /* (Vendor) Twilio WhatsApp Trial */
    return client.messages
      .create({
        mediaUrl: [
          "https://images.unsplash.com/photo-1545093149-618ce3bcf49d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
        ],
        from: "whatsapp:+14155238886",
        body: text,
        to: "whatsapp:+" + results[key][0].vendor.phone,
      })
      .then((message) => console.log(message.sid));
  });

  total = (total / 100).toFixed(2);

  /* (Customer) Email setup*/
  let transporter = nodemailer.createTransport(options);
  const email = new Email({
    message: {
      from: process.env.EMAIL_USER,
      subject: `Order #${orderInfo.id} Majoh Receipt`,
    },
    // uncomment below to send emails in development/test env:
    // send: true
    transport: transporter,
  });

  /** (Customer) Send receipt & keep a copy in our inbox*/
  email
    .send({
      template: "html",
      message: {
        to: orderInfo.metadata.customerEmail,
        cc: process.env.EMAIL_USER,
      },
      locals: {
        orderData: sendCustomer,
        orderID: id,
        orderTotal: total,
        address: orderInfo.metadata.deliveryAddress,
      },
    })
    .then((res) => {
      console.log("res.originalMessage", res.originalMessage);
    })
    .catch(console.error);

  return batch
    .commit()
    .then(function () {
      res.json({ received: true });
    })
    .catch((error) => {
      console.log(error);
      return;
    });
}
payBazaarCoDApp.post("/", (req, res) => {
  try {
    payBazaarCoD(req, res);
  } catch (e) {
    console.log(e);
    send(res, 500, {
      error: `The server received an unexpected error. Please try again and contact the site admin if the error persists.`,
    });
  }
});

exports.payBazaarCoD = functions.https.onRequest(payBazaarCoDApp);

/* (Majoh) Contact form through Telegram */
const contactMajohApp = express();
contactMajohApp.use(cors);
function contactMajoh(req, res) {
  const enquiry = JSON.parse(req.body);

  let text =
    "name: " +
    enquiry.name +
    "\n" +
    "email: " +
    enquiry.email +
    "\n" +
    "phone: " +
    enquiry.phone +
    "\n\n" +
    "message: \n" +
    enquiry.message;

  return api
    .sendMessage({
      chat_id: process.env.CHAT_ID,
      text: text,
    })
    .then(function (data) {
      console.log("Telegram message sent");
    });
}
contactMajohApp.post("/", (req, res) => {
  try {
    contactMajoh(req, res);
  } catch (e) {
    console.log(e);
    send(res, 500, {
      error: `The server received an unexpected error. Please try again and contact the site admin if the error persists.`,
    });
  }
});

exports.contactMajoh = functions.https.onRequest(contactMajohApp);

/*
// Our app has to use express
const createOrderAndSessionApp = express();
// Our app has to use cors
createOrderAndSessionApp.use(cors);
// The function that get data from front-end and create a payment session
//https://us-central1-majoh-8eea2.cloudfunctions.net/createOrderAndSession
function createOrderAndSession(req, res) {
  const body = JSON.parse(req.body);
  // Creating session data from payload
  
  //code block below is to be commented out
  const currency = body.currency;
  const quantity = body.quantity;
  const amount = body.amount;
  const name = body.name;
  const description = body.desc;
  let images = [];
  images[0] = body.imageurl;
  const customerEmail = body.customerEmail;
  const metaData = body.metadata

  // Also we can process the order data, e.g. save it to firebase database
  // Creating session using the data above
  stripe.checkout.sessions
    .create({
      payment_method_types: ["card", "fpx"],
      line_items: body.order_items,
      customer: body.customer,
      metadata: body.metadata,
      mode: 'payment',
      // Redirect them to these URLS 
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

*/

/*
const endpointSecret = process.env.ENDPOINT_SECRET;
// Our app has to use express
//https://us-central1-majoh-8eea2.cloudfunctions.net/processTheOrder
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
  let batch = db.batch();
  let timeID = time();
  if (event.type === 'checkout.session.completed') {
    const orderInfo = event.data.object;
    // Test, here we can proccess the order data after successfull payment
    let customerRef = db.collection('stripe_customers').doc(orderInfo.metadata.uID).collection('paid_orders').doc();
    let ownRef = db.collection('success_orders').doc(timeID);
    batch.set(customerRef, {orderInfo});
    batch.set(ownRef, {orderInfo});
    console.log(orderInfo);
  
    let total = 0;
    let sendCustomer = {};
    let sendVendor =""; 
    const id =  orderInfo.id.substr(orderInfo.id.length - 6);
    for(i = 0; i<orderInfo.display_items.length; i++)
    {
      total+=(orderInfo.display_items[i].amount)*(orderInfo.display_items[i].quantity);
      sendCustomer[orderInfo.display_items[i].custom.name] = orderInfo.display_items[i].quantity + " x " + "RM "+ (orderInfo.display_items[i].amount/100);
      sendVendor+= orderInfo.display_items[i].custom.name + "x" + orderInfo.display_items[i].quantity + "\n";
    }
    
    total = (total/100).toFixed(2);
    
    //Send telegram to user
    api.sendMessage(
      {
        chat_id: process.env.CHAT_ID,
        text: "Order ID: " +  id  + "\n"+ "Payment Method: Online\nOrders: \n" + sendVendor + "Total: " + "RM" + total + "\n" + "\nDelivery: \n" + "Name - " + orderInfo.metadata.Name + "\n" + "Address - " + orderInfo.metadata.deliveryAddress + "\n" + "PhoneNo - " + orderInfo.metadata.phoneNo + "\n" + "Date - " + orderInfo.metadata.deliveryDate
      }
      ).then(function(data)
      {
        console.log("Telegram message sent");
        console.log(sendCustomer);
      });
  

    //Email to customer
  
     
      let transporter = nodemailer.createTransport(options);
      const email = new Email({
        message: {
          from: 'sprouty.co@gmail.com',
          subject: "Your Majoh E-receipt"
        },
        // uncomment below to send emails in development/test env:
        // send: true
        transport: transporter,
        
      });

      email
      .send({
        template: 'html',
        message: {
          to: orderInfo.metadata.customerEmail
        },
        locals: {
          orderData: sendCustomer,
          orderID: id,
          orderTotal: total ,
          address: orderInfo.metadata.deliveryAddress
        }
      })
      .then(res => {
        console.log('res.originalMessage', res.originalMessage)
      
      })
      .catch(console.error);
  
  }

  // Return a response to acknowledge receipt of the event
  return batch.commit().then(function () {
    response.json({received: true});
  })
});
// Exporting our http function
exports.processTheOrder = functions.https.onRequest(processTheOrderApp);

*/

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

//Telegram https://api.telegram.org/bot<YourBOTToken>/getUpdates to get channel ID's
// https://us-central1-majoh-8eea2.cloudfunctions.net/MessengerSend
/*
exports.testTelegramSend = functions.https.onRequest((req, res) => {
  // ...
  const obj = {
    orders: [{
      quantity:3,
      name:"nasi lemak"
    },
    {
      quantity:3,
      name:"nasi lemak"
    }]
  }

  const textMessage = JSON.stringify(obj);
  api.sendMessage(
    {
      chat_id: -483824294,
      text: textMessage
    }
  ).then(function(data)
  {
    console.log(util.inspect(data, false, null));
  });
  res.send(200);
});
*/
