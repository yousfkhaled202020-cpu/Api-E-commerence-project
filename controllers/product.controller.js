const asyncHandler = require("../utils/asyncHandler.js");
const appError = require("../utils/AppError.js");
const product = require("../models/product.model.js");
const category = require("../models/category.model.js");

const getAllProducts = asyncHandler(async (req, res, next) => {
    const { category, minPrice, maxPrice, inStock, search } = req.query;
    const filter = {};
    if (category) { filter.category = category };
    if (minPrice) {
        filter.price = { ...filter.price, $gte: Number(minPrice) };
    };
    if (maxPrice) {
        filter.price = { ...filter.price, $lte: Number(maxPrice) };
    };
    if (inStock === "true") { filter.inStock = true };
    if (search) {
        filter.$or = [
            { name: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } }
        ]
    };

    const products = await product.find(filter);

    res.status(200).json({
        status: "success",
        message: "All products are fetched successfully !",
        data: products

    });
});
const getProductById = asyncHandler(async (req, res, next) => {
    const productById = await product.findById(req.params.id).populate("category", "name description");
    if (!productById) {
        return next(new appError("Product not found", 404));
    }
    res.status(200).json({
        status: "success",
        message: "Product is fetched successfully !",
        data: productById

    });
});
const createNewProduct = asyncHandler(async (req, res, next) => {
    const categoryExists = await category.findById(req.body.category);
    if (!categoryExists) {
        return next(new appError("please specify correct category", 404));
    }
    const newProduct = await product.create(req.body);
    res.status(201).json({
        status: "success",
        message: "Product is created successfully !",
        data: newProduct

    });
});
const updateProduct = asyncHandler(async (req, res, next) => {
    const updatedProduct = await product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
        return next(new appError("Failed to update", 404));
    }
    res.status(200).json({
        status: "success",
        message: "Product is updated successfully !",
        data: updatedProduct

    });
});

const deleteProduct = asyncHandler(async (req, res, next) => {
    const removedProduct = await product.findByIdAndDelete(req.params.id);
    if (!removedProduct) {
        return next(new appError("The product doesn't exist", 404));
    }
    res.status(200).json({
        status: "success",
        message: "Product is deleted successfully !",
        data: null

    });
});

module.exports = {
    getAllProducts,
    getProductById,
    createNewProduct,
    updateProduct,
    deleteProduct
};