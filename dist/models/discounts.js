"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const discountSchema = new mongoose_1.Schema({
    product: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Products', required: true },
    discount: { type: Number, min: 0, max: 100, required: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
const Discount = (0, mongoose_1.model)('Discounts', discountSchema);
exports.default = Discount;
