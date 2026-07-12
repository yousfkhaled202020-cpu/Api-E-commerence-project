const express = require("express");
const router = express.Router();
const controller = require("../controllers/category.controller.js");
router.get("/" , controller.getAllCategories);
router.get("/:id", controller.getCategoryById);
router.post("/", controller.createNewCategory);
router.patch("/:id", controller.updateCategory);
router.delete("/:id", controller.deleteCategory);
module.exports = router ;