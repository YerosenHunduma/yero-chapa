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
    callback_url: "https://example.com/",

    customization: {
      title: title,
      description: description,
    },
  });
  console.log(data);
  return res.status(200).json(data);
};

// const webhookHanddler = async (req, res) => {
//   const secret = process.env.Chapa_Secret_key;

//   const hash = crypto
//     .createHmac("sha256", "yerosen")
//     .update(JSON.stringify(req.body))
//     .digest("hex");
//   if (hash !== req.headers["x-chapa-signature"]) {
//     console.error("Invalid Chapa signature");
//     const payment = new Payment({
//       hash,
//       chapa: req.headers["Chapa-Signature"],
//       xchapa: req.headers["x-chapa-signature"],
//     });
//     await payment.save();
//     return res.send(403);
//   }
//   const {
//     first_name,
//     last_name,
//     email,
//     currency,
//     amount,
//     charge,
//     mode,
//     type,
//     status,
//     reference,
//   } = req.body;

//   const payment = new Payment({
//     first_name,
//     last_name,
//     email,
//     currency,
//     amount,
//     charge,
//     mode,
//     type,
//     status,
//     reference,
//   });
//   await payment.save();

//   res.status(200).send(hash);
// };

const chapaWebhook = async (req, res) => {
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
    .createHmac("sha256", secret)
    .update(JSON.stringify(req.body))
    .digest("hex");
  if (hash == req.headers["Chapa-Signature"]) {
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
  return res.send(403);
};

module.exports = { PaymentService, chapaWebhook };
