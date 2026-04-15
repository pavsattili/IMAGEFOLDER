var express = require("express")

const { paymentController } = require("../Controller/paymentController")
const { verifyPayment } = require("../Controller/verifyPaymentController")
const authMiddleware = require("../Middleware/authMiddleware")

var router = express.Router()

// ✅ Checkout route
router.post("/checkout", authMiddleware, paymentController)

// ✅ Verify payment route
router.post("/verifypayment", authMiddleware, verifyPayment)

module.exports = router