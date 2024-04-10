const { model, Schema, ObjectId } = require("mongoose");

const SubSchema = new Schema(
  {
    subscription: {
      type: {
        plan: {
          type: String,
          default: ["monthly"],
          enum: ["monthly", "quarterly", "yearly"],
        },
        startDate: {
          type: Date,
        },
        endDate: {
          type: Date,
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
