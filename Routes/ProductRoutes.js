var express = require("express")
const { getAllProducts, getSingleProduct, addNewProduct, updateProduct, deleteProduct } = require("../Controller/ProductController")
const adminMiddleware = require('../Middleware/adminMiddleware');
const authMiddleware = require("../Middleware/authMiddleware")
var upload= require("../Middleware/imageMiddleware")


var router = express.Router()




router.get("/products", getAllProducts)

router.get("/products/:id",adminMiddleware,getSingleProduct)

router.post("/addproduct",authMiddleware, upload.single("image"),addNewProduct)

router.put("/update/:id",authMiddleware,adminMiddleware,updateProduct)

router.delete("/delete/:id",authMiddleware,adminMiddleware,deleteProduct)


module.exports = router