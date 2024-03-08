const express = require("express");
const {
  PaymentService,
  webhookHanddler,
  chapaWebhook,
} = require("../controllers/payment");

const router = express.Router();

router.post("/pay", PaymentService);
router.post("/myWebhook", chapaWebhook);

module.exports.chapaPaymentRoute = router;
