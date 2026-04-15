var Cart = require('../Model/CartModel.js')
var mongoose = require('mongoose')

// get cart items for a user
var getCart = async (req, res) => {
    try {
        var userId = req.user.id
        var cart = await Cart.findOne({ userId })

        res.status(200).json({ cart })
    } catch (error) {
        console.log("error", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

// add / increase / decrease item in cart
var addToCart = async (req, res) => {
    try {
        var userId = req.user.id
        var { productId, type } = req.body

        // ✅ validation
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid productId" })
        }

        if (!["increase", "decrease"].includes(type)) {
            return res.status(400).json({ message: "Invalid type" })
        }

        // 🔥 convert once and reuse
        var productObjectId = new mongoose.Types.ObjectId(productId)

        var cart = await Cart.findOne({ userId })

        // if cart does not exist
        if (!cart) {
            if (type === "decrease") {
                return res.status(400).json({ message: "Item not in cart" })
            }

            cart = await Cart.create({
                userId,
                items: [
                    {
                        product: productObjectId, // ✅ FIX
                        quantity: 1
                    }
                ]
            })

            return res.status(201).json({
                message: "cart created",
                data: cart
            })
        }

        // check if product exists in cart
        var existingItem = cart.items.find(
            item => item.product.toString() === productObjectId.toString() // ✅ FIX
        )

        if (existingItem) {

            if (type === "decrease") {
                existingItem.quantity -= 1

                if (existingItem.quantity <= 0) {
                    cart.items = cart.items.filter(
                        item => item.product.toString() !== productObjectId.toString() // ✅ FIX
                    )
                }
            }

            if (type === "increase") {
                existingItem.quantity += 1
            }

        } else {
            if (type === "increase") {
                cart.items.push({
                    product: productObjectId, // ✅ FIX
                    quantity: 1
                })
            } else {
                return res.status(400).json({ message: "Item not in cart" })
            }
        }

        await cart.save()

        return res.status(200).json({
            message: "cart updated",
            data: cart
        })

    } catch (error) {
        console.log("error", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

module.exports = {
    getCart,
    addToCart
}