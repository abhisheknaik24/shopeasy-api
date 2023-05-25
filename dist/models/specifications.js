"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const specificationSchema = new mongoose_1.Schema({
    product: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Products', required: true },
    specification: { type: mongoose_1.Schema.Types.Mixed, required: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
const Specification = (0, mongoose_1.model)('Specifications', specificationSchema);
exports.default = Specification;
