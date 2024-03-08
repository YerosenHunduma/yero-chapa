const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  first_name: {
    type: String,
    trim: true,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
  },
  currency: {
    type: String,
  },
  amount: {
    type: Number,
  },
  charge: {
    type: Number,
  },
  mode: {
    type: String,
  },
  type: {
    type: String,
  },
  status: {
    type: String,
  },
  reference: {
    type: String,
  },
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
  hash: {
    type: String,
  },
  chapa: {
    type: String,
  },
  xchapa: {
    type: String,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
