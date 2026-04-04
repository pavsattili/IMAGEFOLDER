var express = require("express")
const {getCart, addToCart} = require("../Controller/CartController")
const authMiddleware = require("../Middleware/authMiddleware")
var router = express.Router()

router.get("/cart",authMiddleware, getCart)
router.post("/addcart",authMiddleware, addToCart)

module.exports = router