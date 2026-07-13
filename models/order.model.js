const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//creating an enum list for status orders
const ORDERSTATUS = {
    PENDING: "pending",
    CONFIRMED: "confirmed",
    SHIPPED: "shipped",
    DELIVERED: "delivered",
    CANCELLED: "cancelled"
};
// freezing object to avoid any unwanted values
Object.freeze(ORDERSTATUS);

const orderSchema = new Schema({
    orderNumber: {
        type: String,  // to give user more flexability to add details to ordernum
        required: [true, "Please enter order number"],
        unique: true
    },
    items: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "Please Enter Product Reference"]

        },
        name: {
            type: String,
            required: [true, "Please enter Item Name"]


        },
        price: {
            type: Number,
            required: [true, "Please Enter Item Price"],
            min: 1
        },
        quantity: {
            type: Number,
            required: [true, "Please Enter Item Quantity"],
            min: 1
        }

    }],
    totalPrice: {
        type: Number,
        min: 1,
        required: [true, "Please Enter Item Total Price"]
    },
    status: {
        type: String,
        enum: Object.values(ORDERSTATUS),
        default: ORDERSTATUS.PENDING
    },
    shippingAddress: {
        //breaking down address to be easy for user to fill in
        country: {
            type: String,
            minlength: 3,
            required: [true, "Please enter your country name"]
        },
        city: {
            type: String,
            minlength: 3,
            required: [true, "Please enter your city name"]
        },
        street: {
            type: String,
            minlength: 3,
            required: [true, "Please enter your street name"]
        },
        apartmentNumber: {
            type: String,    // to give user more flexability to add details to apartmentnum
            minlength: 3,
            required: [true, "Please enter your Apartment number"]
        },
        landmarks: {
            type: String,
            minlength: 3,
        },
    },
},
    {
        timestamps: true
    });
//exporting schema to use it later 
module.exports = {
    order: mongoose.model("Order", orderSchema),
    ORDERSTATUS
};