const { Chapa } = require("chapa-nodejs");
const chapaPayment = require("./chapaPayment");
const crypto = require("crypto");
const Payment = require("../models/asset");

const chapa = new Chapa({
  secretKey: process.env.Chapa_Secret_key,
});

const PaymentService = async (req, res, next) => {
  var tx_ref = await chapa.generateTransactionReference();
  const { Fname, Lname, email, amount, title, description } = req.body;

  const data = await chapa.initialize({
    first_name: Fname,
    last_name: Lname,
    email: email,
    currency: "ETB",
    amount: amount,
    tx_ref: tx_ref,
    callback_url: "https://example.com/",

    customization: {
      title: title,
      description: description,
    },
  });
  console.log(data);
  return res.status(200).json(data);
};

const webhookHanddler = async (req, res) => {
  const secret = process.env.Chapa_Secret_key;
  console.log(req.body);
  const hash = crypto
    .createHmac("sha256", secret)
    .update(JSON.stringify(req.body))
    .digest("hex");
  if (hash !== req.headers["Chapa-Signature"]) {
    console.error("Invalid Chapa signature");
    return res.status(403).send("Forbidden");
  }
  const {
    first_name,
    last_name,
    email,
    currency,
    amount,
    charge,
    mode,
    type,
    status,
    reference,
  } = req.body;

  const payment = new Payment({
    first_name,
    last_name,
    email,
    currency,
    amount,
    charge,
    mode,
    type,
    status,
    reference,
  });
  await payment.save();
  console.log(payment);
  console.log("Payment saved successfully");

  res.send(200);
};

module.exports = { PaymentService, webhookHanddler };
