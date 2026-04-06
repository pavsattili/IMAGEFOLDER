var express = require("express");
var router = express.Router();

var { paymentController } = require("../Controller/paymentController");

// middleware (JWT authentication)
var authMiddleware = require("../Middleware/authMiddleware");

// create order / payment
router.post("/checkout", authMiddleware, paymentController);

module.exports = router;