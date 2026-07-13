const express = require("express");
const cartRouter = express.Router();
const cartController = require("../controllers/cart.controller.js");
cartRouter.get("/", cartController.getCart);
cartRouter.delete("/items/:id", cartController.deleteItemById);
cartRouter.post("/items", cartController.createNewItem);
cartRouter.patch("/items/:id", cartController.updateItem);
cartRouter.delete("/", cartController.deleteCart);
module.exports = cartRouter;