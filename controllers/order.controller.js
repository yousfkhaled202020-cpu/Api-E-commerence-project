const asyncHandler = require("../utils/asyncHandler.js");
const appError = require("../utils/AppError.js");
const category = require("../models/category.model.js");
const product = require("../models/product.model.js");
const cart = require("../models/cart.model.js");
const { order, ORDERSTATUS } = require("../models/order.model.js");

const getAllOrders = asyncHandler(async (req, res, next) => {
    const orders = await order.find();
    res.status(200).json({
        status: "success",
        message: "All orders are fetched successfully !",
        data: orders

    });
});
const getOrderById = asyncHandler(async (req, res, next) => {
    const orderById = await order.findById(req.params.id).populate("items.product", "name  price");
    if (!orderById) {
        return next(new appError("Order not found", 404));
    }
    res.status(200).json({
        status: "success",
        message: "Order is fetched successfully !",
        data: orderById

    });

});
const updateOrder = asyncHandler(async (req, res, next) => {
    const { status } = req.body;
    if (!Object.values(ORDERSTATUS).includes(status)) {
        return next(new appError("PLease specify correct status", 400));
    }
    const foundOrder = await order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!foundOrder) {
        return next(new appError("Order not found", 404));
    }
    res.status(200).json({
        status: "success",
        message: "Order is updated successfully !",
        data: foundOrder

    });
});
module.exports = { getAllOrders, getOrderById, updateOrder };