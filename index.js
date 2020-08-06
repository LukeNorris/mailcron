const cron = require('node-cron')
const express = require('express')
let nodemailer = require("nodemailer");
 
 
app = express()

const password = process.env.EMAIL_PASSWORD;
const emailaddress=process.env.EMAIL_ADDRESS
 
// create mail transporter
let transporter = nodemailer.createTransport({
   host: 'smtp.gmail.com',
   port: 587,
   secure: false,
   requireTLS: true,
   auth: {
       user: emailaddress,
       pass: password
   }
})
 
 // sending emails at periodic intervals
 cron.schedule("* * * * *", function(){
   console.log("---------------------");
   console.log("Running Cron Job");
   let mailOptions = {
     from: emailaddress,
     to: emailaddress,
     subject: `Cron test from local server ;)`,
     text: `Hi there, this email was automatically sent by Luke's cron job`
   };
   transporter.sendMail(mailOptions, function(error, info) {
     if (error) {
       throw error;
     } else {
       console.log("Email successfully sent!");
     }
   });
 });
 
 app.listen("3128");
 
 

