const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const dbUrl = process.env.DATABASE_URL;
async function runDb(){
    try{
        const result = await mongoose.connect(dbUrl);
            console.log("Database is connected");
    }catch(error){
        console.log(error , error.message);
    }
    }
module.exports = runDb;
