require("dotenv").config();
const connectDb = require("./database/connect.js");
const express = require("express");
async function runServer(){
 await connectDb();
const app = express();
const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
}
runServer();
