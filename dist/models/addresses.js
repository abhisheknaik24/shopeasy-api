"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const addressSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Users', required: true },
    address: { type: String, maxLength: 255, required: true },
    isActive: { type: Boolean, default: false },
}, { timestamps: true });
const Address = (0, mongoose_1.model)('Addresses', addressSchema);
exports.default = Address;
