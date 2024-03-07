const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const db = require("./config/DbConfig");
const { rootRouter } = require("./Routes");

const app = express();

app.use(express.json());

app.use(cors({ origin: "*" }));

app.use("/api", rootRouter);

app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}!`);
});
