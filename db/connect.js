const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const dbUrl = process.env.MONGO_URI;
async function connectDB() {
    try {
        const result = await mongoose.connect(dbUrl);
        console.log("Database is connected");
    } catch (error) {
        console.log(error, error.message);
    }
}
module.exports = connectDB;
