require("dotenv").config()

var express = require("express")
const connectToDatabase = require("./Database/db");
var userRoutes = require("./Routes/userRoutes")
var productRoutes = require("./Routes/ProductRoutes")
var profileRoutes = require("./Routes/ProfileRoutes")
var app = express()


app.use(express.json())

app.use("/api/userRoutes",userRoutes)

app.use("/api/productRoutes",productRoutes)
 
app.use("/api/profileRoutes",profileRoutes)




connectToDatabase()


var port = process.env.PORT

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});