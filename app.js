//requiring packages and files to combine then in server 
const dotenv = require("dotenv").config();
const connectDb = require("./db/connect.js");
const express = require("express");
const mongoSanitize = require("express-mongo-sanitize");
const errorHandler = require("./middleware/errorHandler.js");
const categoriesRouter = require("./routes/category.routes.js");
const productsRouter = require("./routes/product.routes.js");
const cartRouter = require("./routes/cart.routes.js");
const orderRouter = require("./routes/order.routes.js");


const app = express();
app.use(express.json())
app.use(mongoSanitize())

// running routes
app.use("/api/categories", categoriesRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// 404 error handler 
app.use((req, res, next) => {
    const error = new Error(`Not Found -  ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
})

//error handler
app.use(errorHandler);
//function to run server 
async function runServer() {
    await connectDb(); // run database first as it takes much time 
    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
}

runServer();
