"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const offerSchema = new mongoose_1.Schema({
    product: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Products', required: true },
    offer: { type: String, maxLength: 255, required: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
const Offer = (0, mongoose_1.model)('Offers', offerSchema);
exports.default = Offer;
