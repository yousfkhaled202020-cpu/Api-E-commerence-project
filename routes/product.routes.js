const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller.js"); // requiring products controller to use its functions
router.get("/" , productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", productController.createNewProduct);
router.patch("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
module.exports = router ;