const nodemailer = require('nodemailer');
const express = require('express');
const Email = require('email-templates');
var PythonShell = require('python-shell');
var path = require('path');

var app = express();
const emailOptions = {
    service: 'gmail',
    auth: {
      user: "sprouty.co@gmail.com",
      pass: "Sprouty123"
    }
  }

let transporter = nodemailer.createTransport(emailOptions);

let options = {};
const email = new Email({
    message: {
      from: 'sprouty.co@gmail.com'
    },
    // uncomment below to send emails in development/test env:
    // send: true
    transport: transporter
  });
  orders= {
    nasigoreng : "3",
    quantity: "5"
  }
app.get('/sendEmail', function(req, res){
email
  .send({
    template: 'html',
    message: {
      to: 'marcosjconcon@gmail.com'
    },
    locals: {
      name: 'Elon',
      orderData:orders,
      orderID: 666666,
      orderTotal : 56,
      address : '979 Jalan Lavender Height 27 Taman Lavender Height, Seremban, 70400, Negeri Sembilan'
    }
  })
  .then(res => {
    console.log('res.originalMessage', res.originalMessage)
   
  })
  .catch(console.error);
  res.send(200);
})

app.get('/sendImg', function(req, res){


  let img = `<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSuLmCrsmf7OFIxrcA1GaoGiGyg9VeNCAqvy6O7_NRlVd6IgykR&usqp=CAU"/>`;
  let html = `<!Doctype html><html><head><title>Sample</title></head>`;
  html+= `<body><h1>Sampple</h1><main>${img}</main></body></html>`;
  res.send(html);
})
  var server  = app.listen(8080, function() {
      host = server.address().address
      port = server.address().port
  })