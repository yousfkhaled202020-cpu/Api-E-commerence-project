// requiring the packages
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    items: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "Please enter a product to the cart "]
        },
        quantity: {
            type: Number,
            min: 1,
            required: [true, "Please enter quantity of the item "]
        },
        price: {
            type: Number,
            required: [true, "Please Enter item price"],
            min: 0
        },
    }],
    totalPrice: {
        type: Number,
        default: 0
    }
},
    {
        timestamps: true
    }

);
module.exports = mongoose.model("Cart", cartSchema);