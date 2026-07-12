const dotenv = require("dotenv").config();
const connectDb = require("./db/connect.js");
const express = require("express");
const mongoSanitize = require("express-mongo-sanitize");




const app = express();
app.use(express.json())
app.use(mongoSanitize())


async function runServer() {
    await connectDb();
    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
}


runServer();
git