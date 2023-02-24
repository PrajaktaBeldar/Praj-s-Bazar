const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../allControllers/paymentController.js");
const router = express.Router(); 
const { isAuthenticatedPeople } = require("../mid/authentication.js");

router.route("/api/v1/payment/process").post(isAuthenticatedPeople, processPayment);

router.route("/api/v1/stripeapikey").get(isAuthenticatedPeople, sendStripeApiKey);

module.exports = router; 
   