const express = require("express");
const { productRoutes } = require("./ProductRoutes");
const { chapaPaymentRoute } = require("./chapa");

const router = express.Router();

router.use("/products", productRoutes);
router.use("/payment", chapaPaymentRoute);
router.use("/hello", (req, res) => {
  res.send("Hello World");
});

module.exports.rootRouter = router;
