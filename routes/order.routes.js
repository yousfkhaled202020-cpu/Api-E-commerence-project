const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controllers/order.controller.js");
orderRouter.get("/" , orderController.getAllOrders);
orderRouter.get("/:id", orderController.getOrderById);
orderRouter.post("/", orderController.createNewOrder);
orderRouter.patch("/:id/status", orderController.updateOrder);
module.exports = orderRouter ;
