const express = require("express");
const orderRouter = express.Router();
// requirng order controller to use its function  
const orderController = require("../controllers/order.controller.js");
orderRouter.get("/", orderController.getAllOrders);
orderRouter.get("/:id", orderController.getOrderById); 
orderRouter.post("/", orderController.createNewOrder);
orderRouter.patch("/:id/status", orderController.updateOrder);
orderRouter.patch("/:id/cancel", orderController.cancelOrder); // I added a new feature to complete the logic cancel order

module.exports = orderRouter;
