const mongoose = require("mongoose");

let DB_Url = "";

if (process.env.NODE_ENV === "DEVELOPMENT")
  DB_Url = process.env.Mongo_Remote_Url;
if (process.env.NODE_ENV === "PRODUCTION") DB_Url = process.env.Mongo_Prod_Url;

mongoose.connect(process.env.Mongo_Local_Url);

const db = mongoose.connection;

db.on("connected", () => {
  console.log(`MongoDB Connected to Host:${mongoose.connection?.host}`);
});

db.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
});

module.exports = db;
