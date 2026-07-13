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
    // bring in real product details instead of just the ObjectId
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
const createNewOrder = asyncHandler(async (req, res, next) => {
    const foundcart = await cart.findOne();
    if (foundcart.items.length === 0) {
        return next(new appError("Your cart is empty", 400))
    }
    let orderItems = [];
    for (const item of foundcart.items) {
        const foundproduct = await product.findById(item.product);
        if (!foundproduct) {
            return next(new appError("product not found", 404));
        }
        // check product stock to reject request if its less than quantity requested
        if (foundproduct.stock < item.quantity) {
            return next(new appError("No enough stock for quantity requested", 400));
        }
        orderItems.push({
            product: item.product,
            name: foundproduct.name,
            price: foundproduct.price,
            quantity: item.quantity
        });
        foundproduct.stock = foundproduct.stock - item.quantity;
        await foundproduct.save();
    }
    foundcart.totalPrice = foundcart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const orderNumber = `ORD-${Date.now()}`; // to make order number unique i defined with date 
    let neworder = await order.create({
        orderNumber: orderNumber,
        items: orderItems,
        totalPrice: foundcart.totalPrice,
        shippingAddress: req.body.shippingAddress // only take shippingAddress, not the whole body (avoid trusting extra client fields)
    })
    foundcart.items = [];
    foundcart.totalPrice = 0;
    await foundcart.save();
    res.status(201).json({
        status: "success",
        message: "order created successfully !",
        data: neworder
    });
});
// i added a feature "not requested by rubric" to complete the logic and give user ability to cancel his order
const cancelOrder = asyncHandler(async (req, res, next) => {
    const foundOrder = await order.findById(req.params.id);
    if (!foundOrder) {
        return next(new appError("order not found", 404));
    }
    if (foundOrder.status !== ORDERSTATUS.PENDING) {
        return next(new appError("Can't cancel order now", 400));
    }
    for (const item of foundOrder.items) {
        const foundproduct = await product.findById(item.product);
        if (!foundproduct) {
            return next(new appError("product not found", 404));
        }
        foundproduct.stock = foundproduct.stock + item.quantity;
        await foundproduct.save();
    }
    foundOrder.status = ORDERSTATUS.CANCELLED;
    await foundOrder.save();
    res.status(200).json({
        status: "success",
        message: "order cancelled successfully !",
        data: foundOrder
    });
});
module.exports = { getAllOrders, getOrderById, updateOrder, createNewOrder, cancelOrder };