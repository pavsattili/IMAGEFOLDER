var mongoose = require('mongoose');

var cartSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    items: [
        {
            product : {
                type: mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true
            },
            quantity:{
                type:Number,
                default:1
            }
        }
    ]
})

var cart = mongoose.model("cart", cartSchema)

module.exports = cart