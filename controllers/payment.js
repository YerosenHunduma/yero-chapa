const { Chapa } = require("chapa-nodejs");
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
    return_url: "https://yerosen.com/",
    customization: {
      title: title,
      description: description,
    },
  });
  return res.status(200).json(data);
};

const webhookHanddler = async (req, res) => {
  const secret = process.env.Chapa_Secret_key;
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

  const hash = crypto
    .createHmac("sha256", "yerosen")
    .update(JSON.stringify(req.body))
    .digest("hex");
  if (hash === req.headers["x-chapa-signature"]) {
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
    return res.send(200);
  }

  return res.status(403).send("Forbidden");
};

module.exports = { PaymentService, webhookHanddler };
