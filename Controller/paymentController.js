// var Cart = require("../Model/CartModel");
// var Product = require("../Model/ProductModel");
// var razorpay = require("../config/razorpay");

// var paymentController = async (req, res) => {
//     try {
//         var userId = req.user.id

//         var cart = await Cart.findOne({ userId });

//         if (!cart || cart.items.length === 0) {
//             return res.status(400).json({
//                 message: "Cart is empty"
//             });
//         }

//   ;

//         var totalAmount = 0;

//         for (var item of cart.items) {
//             var product = await Product.findById(item.product);
//             totalAmount += product.price * item.quantity;
//         }

    

//         // ✅ Razorpay order
//         var order = await razorpay.orders.create({
//             amount: totalAmount * 100,
//             currency: "INR"
//         });

//         return res.status(200).json({
//             message: "Checkout created",
//             totalAmount,
//             prder
//         });

//     } catch (error) {
//         console.log("Error:", error);

//         return res.status(500).json({
//             message: "Something went wrong"
//         });
//     }
// };

// module.exports = {
//     paymentController
// }; 
var Cart = require("../Model/CartModel");
var Product = require("../Model/ProductModel");
var razorpay = require("../config/razorpay");

var paymentController = async (req, res) => {
    try {
        // ✅ 1. Get logged-in user
        var userId = req.user.id;

        // ✅ 2. Get user cart
        var cart = await Cart.findOne({ userId });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                message: "Cart is empty"
            });
        }

        // ✅ 3. Calculate total amount
        var totalAmount = 0;

        for (var item of cart.items) {
            var product = await Product.findById(item.product);

            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }

            totalAmount += product.price * item.quantity;
        }

        // ✅ 4. Create Razorpay order
        var options = {
            amount: totalAmount * 100, // convert to paisa
            currency: "INR",
            receipt: "receipt_" + Date.now()
        };

        var order = await razorpay.orders.create(options);

        // ✅ 5. Send response to frontend
        return res.status(200).json({
            message: "Checkout created successfully",
            totalAmount,
            orderId: order.id,
            currency: order.currency
        });

    } catch (error) {
        console.log("Error in paymentController:", error);

        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};

module.exports = {
    paymentController
};