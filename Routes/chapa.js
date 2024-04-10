const express = require("express");
const {
  PaymentService,
  chapaWebhook,
  verfiyPayment,
} = require("../controllers/payment");

const router = express.Router();

router.post("/pay", PaymentService);
router.post("/pay", verfiyPayment);
router.post("/myWebhook", chapaWebhook);

module.exports.chapaPaymentRoute = router;
