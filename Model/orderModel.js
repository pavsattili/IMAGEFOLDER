var mongoose = require("mongoose")


var orderSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
    },
    items : [
        {
            product : {
                type : mongoose.Schema.Types.ObjectId,
            },
            quantity : {
                type : Number,
            }
        }
    ],
    totalAmount : {
        type : Number,
    },
    status : {
        type  : String,
        default : "pending"
    },
    paymentId : {
        type : String
    }

})

var order = mongoose.model("order",orderSchema)

module.exports = order