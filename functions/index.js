const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
const functions = require('firebase-functions');
// We should install required packages (stripe, body-parser) using npm install inside /functions/ folder
const bodyParser = require("body-parser");
const cors = require("cors")({ origin: true });
const express = require("express");
const stripe = require("stripe")(functions.config().stripe.token);
var app = admin.initializeApp(functions.config().firebase);
let db = admin.firestore();
var telegram = require('telegram-bot-api');
require('dotenv').config()
const Email = require('email-templates');
var uuid = require('uuid-random');

var api = new telegram({
	token: process.env.TELEGRAM_TOKEN,
});

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
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
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

/* Triggered when customers checksout by cash */
const payCashOnDeliveryApp = express();
payCashOnDeliveryApp.use(cors);

function payCashOnDelivery(req, res){
  const orderInfo = JSON.parse(req.body);
  let timeID = time();
  let batch = db.batch();
  let customerRef = db.collection('stripe_customers').doc(orderInfo.metadata.uID).collection('paid_orders').doc();
  let ownRef = db.collection('success_orders').doc(timeID);
  batch.set(customerRef, {orderInfo});
  batch.set(ownRef, {orderInfo});
  console.log(orderInfo);

  let total = 0;
  const idexample = uuid();
  let sendCustomer = {};
  let sendVendor =""; 
  const id=  idexample.substr(idexample.length - 6);
  for(i = 0; i<orderInfo.order_items.length; i++)
  {
    total+=(orderInfo.order_items[i].amount)*(orderInfo.order_items[i].quantity);
    sendCustomer[orderInfo.order_items[i].name] = orderInfo.order_items[i].quantity + " x " + "RM "+ (orderInfo.order_items[i].amount/100);
    sendVendor+= orderInfo.order_items[i].name + "x" + orderInfo.order_items[i].quantity + "\n";
  }
  
  total = (total/100).toFixed(2);
 
  api.sendMessage(
    {
      chat_id: process.env.CHAT_ID,
      text: "Order ID: " +  id  + "\n"+ "Payment Method: Cash on delivery\nOrders: \n" + sendVendor + "Total: " + "RM" + total + "\n" + "\nDelivery: \n" + "Name - " + orderInfo.metadata.Name + "\n" + "Address - " + orderInfo.metadata.deliveryAddress + "\n" + "PhoneNo - " + orderInfo.metadata.phoneNo + "\n" + "Date - " + orderInfo.metadata.deliveryDate
    }
    ).then(function(data)
    {
      console.log("Telegram message sent");
      console.log(sendCustomer);
    });
   
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
  
    return batch.commit().then(function () {
      res.json({received: true});
    }).catch((error) => {
      console.log(error);
      return;
    });

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

exports.payCashOnDelivery = functions.https.onRequest(
  payCashOnDeliveryApp
);

// Our app has to use express
const createOrderAndSessionApp = express();
// Our app has to use cors
createOrderAndSessionApp.use(cors);
// The function that get data from front-end and create a payment session
//https://us-central1-majoh-8eea2.cloudfunctions.net/createOrderAndSession
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
      customer: body.customer,
      metadata: body.metadata,
      mode: 'payment',
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
    for(i = 0; i<orderInfo.order_items.length; i++)
    {
      total+=(orderInfo.order_items[i].amount)*(orderInfo.order_items[i].quantity);
      sendCustomer[orderInfo.order_items[i].custom.name] = orderInfo.order_items[i].quantity + " x " + "RM "+ (orderInfo.order_items[i].amount/100);
      sendVendor+= orderInfo.order_items[i].custom.name + "x" + orderInfo.order_items[i].quantity + "\n";
    }
    
    total = (total/100).toFixed(2);
    /* Send to vendor */
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
  

    /* Emailing invoice to customer */
  
     
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