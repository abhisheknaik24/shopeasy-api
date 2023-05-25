"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Users', required: true },
    orders: [
        { type: mongoose_1.Schema.Types.ObjectId, ref: 'OrderItems', required: true },
    ],
    grandTotal: { type: mongoose_1.Schema.Types.Decimal128, required: true },
    orderDate: { type: Date, default: Date.now },
    deliveryDate: { type: Date },
    paymentOption: { type: String },
    isPayment: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
const Order = (0, mongoose_1.model)('Orders', orderSchema);
exports.default = Order;
