"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("../models/users"));
const orders_1 = __importDefault(require("../models/orders"));
const orderItems_1 = __importDefault(require("../models/orderItems"));
const getOrders = async (req, res) => {
    if (req.method === 'GET') {
        const { email } = req.params;
        if (email) {
            try {
                let user = (await users_1.default.findOne({
                    email: email,
                    isActive: true,
                }));
                let orders = await orders_1.default.find({
                    user: user._id,
                    isActive: true,
                }).populate('orders');
                res.status(200).json({
                    success: true,
                    message: 'Orders fetched successfully!',
                    data: { orders: orders },
                });
            }
            catch (error) {
                res.status(400).json({
                    success: false,
                    message: String(error),
                });
            }
        }
        else {
            res.status(400).json({
                success: false,
                message: 'Request params is missing!',
            });
        }
    }
    else {
        res.status(400).json({
            success: false,
            message: 'Request method is not allowed!',
        });
    }
};
const addOrder = async (req, res) => {
    if (req.method === 'POST') {
        const { email, products, grandTotal, paymentOption, isPayment } = req.body;
        if (email && products && grandTotal && paymentOption && isPayment) {
            try {
                let user = (await users_1.default.findOne({
                    email: email,
                    isActive: true,
                }));
                let orders = [];
                for (let product of products) {
                    const orderItem = new orderItems_1.default({
                        product: product._id,
                        quantity: product.quantity,
                    });
                    await orderItem.save();
                    orders.push(orderItem);
                }
                const order = new orders_1.default({
                    user: user._id,
                    orders: orders,
                    grandTotal: grandTotal,
                    paymentOption: paymentOption,
                    isPayment: isPayment,
                });
                await order.save();
                res.status(200).json({
                    success: true,
                    message: 'Order added successfully!',
                    data: { order: order },
                });
            }
            catch (error) {
                res.status(400).json({
                    success: false,
                    message: String(error),
                });
            }
        }
        else {
            res.status(400).json({
                success: false,
                message: 'Request body is missing!',
            });
        }
    }
    else {
        res.status(400).json({
            success: false,
            message: 'Request method is not allowed!',
        });
    }
};
exports.default = {
    getOrders,
    addOrder,
};
