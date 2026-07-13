// requiring the packages
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Category Schema

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, "Please Enter the Name of the Category"],
        unique: true,
        trim: true
    },
    description: {
        type: String
    },
    slug: {
        type: String,
        required: [true, "Please Enter the slug of the Category"],
        unique: true,
        trim: true
    }
},
    {
        timestamps: true
    });

//exporting schema
module.exports = mongoose.model('Category', categorySchema);