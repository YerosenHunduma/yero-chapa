const mongoose = require("mongoose");

mongoose.connect(process.env.Mongo_Remote_Uri);

const db = mongoose.connection;

db.on("connected", () => {
  console.log(`MongoDB Connected to Host:${mongoose.connection?.host}`);
});

db.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
});

module.exports = db;
