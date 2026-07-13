const asyncHandler = require("../utils/asyncHandler.js");
const appError = require("../utils/AppError.js");
const Category = require("../models/category.model.js");

const getAllCategories = asyncHandler(async (req, res, next) => {
    const categories = await Category.find();
    res.status(200).json({
        status: "success",
        message: "All categories are fetched successfully !",
        data: categories

    });
});

const getCategoryById = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        return next(new appError("Category not found", 404));
    }
    res.status(200).json({
        status: "success",
        message: "Category is fetched successfully !",
        data: category

    });
});

const createNewCategory = asyncHandler(async (req, res, next) => {
    const newCategory = await Category.create(req.body);
    res.status(201).json({
        status: "success",
        message: "Category is created successfully !",
        data: newCategory

    });
});

const updateCategory = asyncHandler(async (req, res, next) => {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCategory) {
        return next(new appError("Failed to update", 404));
    }
    res.status(200).json({
        status: "success",
        message: "Category is updated successfully !",
        data: updatedCategory

    });
});

const deleteCategory = asyncHandler(async (req, res, next) => {
    const removedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!removedCategory) {
        return next(new appError("The category doesn't exist", 404));
    }
    res.status(200).json({
        status: "success",
        message: "Category is deleted successfully !",
        data: null

    });
});

module.exports = {
    getAllCategories,
    getCategoryById,
    createNewCategory,
    updateCategory,
    deleteCategory
};