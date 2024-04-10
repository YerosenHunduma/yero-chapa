const { Chapa } = require("chapa-nodejs");
const crypto = require("crypto");
const Payment = require("../models/asset");
const Subscription = require("../models/subscription");

const chapa = new Chapa({
  secretKey: process.env.Chapa_Secret_key,
});

const PaymentService = async (req, res) => {
  const tx_ref = await chapa.generateTransactionReference();

  const { Fname, Lname, email, amount } = req.body;

  const data = await chapa.initialize({
    first_name: Fname,
    last_name: Lname,
    email: email,
    currency: "ETB",
    amount: amount,
    tx_ref: tx_ref,
    callback_url: "https://yero-chapa.onrender.com/api/payment/myWebhook,",
    return_url: "https://yerosen.com/",
  });

  return res.status(200).json(data);
};

const chapaWebhook = async (req, res) => {
  const secret = process.env.webhook_secret_key;
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
    created_at,
    updated_at,
  } = req.body;
  const hash = crypto
    .createHmac("sha256", secret)
    .update(JSON.stringify(req.body))
    .digest("hex");
  if (hash == req.headers["x-chapa-signature"]) {
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
      created_at,
      updated_at,
    });
    await payment.save();
    let plan = "";
    let endDate;
    if (amount == 100) {
      plan = "monthly";
      endDate = new Date(created_at.setMonth(created_at.getMonth() + 1));
    } else if (amount == 500) {
      plan = "quarterly";
      endDate = new Date(created_at.setMonth(created_at.getMonth() + 3));
    } else if (amount == 1000) {
      plan = "yearly";
      endDate = new Date(created_at.setFullYear(created_at.getFullYear() + 1));
    }
    new Subscription({
      subscription: {
        plan,
        startDate: created_at ? created_at : updated_at,
        endDate,
      },
    });
    await Subscription.save();
    return res.send(200);
  }
  return res.send(403);
};

module.exports = { PaymentService, chapaWebhook };
