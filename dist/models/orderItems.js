"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderItemSchema = new mongoose_1.Schema({
    product: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Products', required: true },
    quantity: { type: Number, min: 1, required: true },
    isReturn: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
const OrderItem = (0, mongoose_1.model)('OrderItems', orderItemSchema);
exports.default = OrderItem;
