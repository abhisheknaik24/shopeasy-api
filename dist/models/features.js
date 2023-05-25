"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const featureSchema = new mongoose_1.Schema({
    product: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Products', required: true },
    feature: { type: String, maxLength: 255, required: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
const Feature = (0, mongoose_1.model)('Features', featureSchema);
exports.default = Feature;
