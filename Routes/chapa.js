const express = require("express");
const { PaymentService, webhookHanddler } = require("../controllers/payment");
const { verify } = require("crypto");

const router = express.Router();

router.post("/pay", PaymentService);
router.post("/myWebhook", webhookHanddler);
router.get("/verify/:tx_ref", verify);

module.exports.chapaPaymentRoute = router;
