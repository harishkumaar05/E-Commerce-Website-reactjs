const functions = require("firebase-functions");
const express = require("express");
const cors= require("cors");
const stripe = require("stripe")('sk_test_51Iw0DVSCQXel1DkIMzRXLWjeT13SETl2CvVD7iWLqDtA9veajhR3bZoHdISPGXD904j4GYq79M19r0jEE1mgkYIt00P48XxqCi'
);
//API

//App Config
const app=express();
//MiddleWare
app.use(cors({ origin: true }));
app.use(express.json());
//API Routes
app.get("/", (request, response) => response.status(200).send("hello world"));
app.post('/payments/create', async(request,response) => {
     const total = request.query.total;

   console.log("Payment Request Recieved for this amount >>> ", total);

     const paymentIntent = await stripe.paymentIntents.create({
         amount: total, // subunits of the currency
         currency: "usd",
               });
       response.status(201).send({
        clientSecret: paymentIntent.client_secret,
      });
 });
//Listen command
exports.api = functions.https.onRequest(app);

//Example Endpoint
//http://localhost:5001/ecommerce-website-1470a/us-central1/api