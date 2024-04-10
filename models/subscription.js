const { model, Schema, ObjectId } = require("mongoose");

const SubSchema = new Schema(
  {
    subscription: {
      type: {
        plan: {
          type: String,
          default: ["monthly"],
          enum: ["monthly", "quarterly", "yearly"],
          required: true,
        },
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
          required: true,
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

const Subscription = model("Subscription", SubSchema);

module.exports = Subscription;
