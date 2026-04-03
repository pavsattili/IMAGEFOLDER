var express = require("express")
const { registerUser, loginUser } = require("../Controller/userController")

var router = express.Router()

router.post("/register",registerUser)
router.post("/login",loginUser)

module.exports = router