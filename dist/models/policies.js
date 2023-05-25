"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const policySchema = new mongoose_1.Schema({
    product: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Products', required: true },
    policy: { type: String, maxLength: 255, required: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
const Policy = (0, mongoose_1.model)('Policies', policySchema);
exports.default = Policy;
