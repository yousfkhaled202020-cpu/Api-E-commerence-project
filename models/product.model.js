// requiring the packages
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//creating product schema
const productSchema = new Schema(
    {
        name: {
            type: String,
            required: [true,"Please Enter Product name"]
        },
        description: {
            type: String,
            minlength:3
        },
        price: {
            type: Number,
            required: [true,"Please Enter Product price"],
            min: 0
        },
        stock: {
            type: Number,
            min: 0,
            default: 0
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category"
        },
        images: {
            type: [String]
        },
        inStock: {
            type: Boolean,
        }
    },
    {
        timestamps: true
    }

);

//exporting schema
module.exports = mongoose.model("Product", productSchema);