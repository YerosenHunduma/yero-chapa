const express = require("express");
const getProducts = require("../controllers/getProducts");

const router = express.Router();

router.get("/get", getProducts);

module.exports.productRoutes = router;
