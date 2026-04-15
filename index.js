require("dotenv").config()

var express = require("express")
const connectToDatabase = require("./Database/db");
var userRoutes = require("./Routes/userRoutes")
var productRoutes = require("./Routes/ProductRoutes")
var profileRoutes = require("./Routes/ProfileRoutes")
var cartRoutes = require("./Routes/CartRoutes")
var  paymentRoutes = require("./Routes/paymentRoutes")
var orderRoutes = require("./Routes/OrderRoutes")
const {connectRedis} = require("./config/redisClient")

var app = express()


app.use(express.json())

app.use("/api/userRoutes",userRoutes)

app.use("/api/productRoutes",productRoutes)
 
app.use("/api/profileRoutes",profileRoutes)
app.use("/api/cartRoutes",cartRoutes)
app.use("/api/paymentRoutes",paymentRoutes)


app.use("/api/orderRoutes",orderRoutes)



connectToDatabase()

connectRedis()

var port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});