const asyncHandler = require("../utils/asyncHandler.js");
const appError = require("../utils/AppError.js");
const cart = require("../models/cart.model.js");
const product = require("../models/product.model.js");


const createNewItem = asyncHandler(async (req, res, next) => {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
        return next(new appError("productId and quantity are required", 400));
    }
    const foundProduct = await product.findById(productId);
    if (!foundProduct) {
        return next(new appError("product not found", 404));
    }
    if (foundProduct.stock < Number(quantity)) {
        return next(new appError("No enough stock for quantity requested ", 400));
    }
    let foundCart = await cart.findOne();
    if (!foundCart) {
        foundCart = await cart.create({ items: [] });
    }
    let existingItem = foundCart.items.find(item => item.product == productId);
    if (existingItem) {
        existingItem.quantity = Number(quantity) + Number(existingItem.quantity);
    }
    else {
        const newItem = foundCart.items.push({ product: productId, quantity: Number(quantity), price: foundProduct.price });
    }
    foundCart.totalPrice = foundCart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    await foundCart.save();
    res.status(201).json({
        status: "success",
        message: "Item added to cart successfully!",
        data: foundCart
    });
});

const updateItem = asyncHandler(async (req, res, next) => {
    const productId = req.params.id;
    const { quantity } = req.body;
    let foundCart = await cart.findOne();
    if (!foundCart) {
        return next(new appError("Cart not found", 404));
    }
    const founditem = foundCart.items.find(item => item.product == productId);
    if (!founditem) {
        return next(new appError("product not found", 404));
    }
    if (Number(quantity) == 0) {
        foundCart.items = foundCart.items.filter(item => item.product !== founditem.product);
    }
    else {
        founditem.quantity = Number(quantity);
    }
    foundCart.totalPrice = foundCart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    await foundCart.save();
    res.status(200).json({
        status: "success",
        message: "Item updated successfully!",
        data: foundCart
    });
});

const deleteItemById = asyncHandler(async (req, res, next) => {
    const productId = req.params.id;
    let foundCart = await cart.findOne();
    if (!foundCart) {
        return next(new appError("Cart not found", 404));
    }
    const founditem = foundCart.items.find(item => item.product == productId);
    if (!founditem) {
        return next(new appError("product not found", 404));
    }
    foundCart.items = foundCart.items.filter(item => item.product !== founditem.product);
    foundCart.totalPrice = foundCart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    await foundCart.save();
    res.status(200).json({
        status: "success",
        message: "Item deleted successfully!",
        data: foundCart
    });
});

const deleteCart = asyncHandler(async (req, res, next) => {
    let foundCart = await cart.findOne();
    if (!foundCart) {
        foundCart = await cart.create({ items: [], totalPrice: 0 });
    }
    foundCart.items = [];
    foundCart.totalPrice = 0;
    await foundCart.save();
    res.status(200).json({
        status: "success",
        message: "Cart cleared successfully!",
        data: foundCart
    });
});

const getCart = asyncHandler(async (req, res, next) => {
    let foundCart = await cart.findOne().populate("items.product", "name price");
    if (!foundCart) {
        return res.status(200).json({
            status: "success",
            message: "Cart is empty",
            data: { items: [], totalPrice: 0 }
        });
    } else {
        res.status(200).json({
            status: "success",
            message: "Cart found successfully!",
            data: foundCart
        });

    }


});

module.exports = { createNewItem, updateItem, deleteItemById, getCart, deleteCart };