"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstName: { type: String, maxLength: 255, required: true },
    lastName: { type: String, maxLength: 255, required: true },
    email: { type: String, maxLength: 255, required: true, unique: true },
    password: { type: String, maxLength: 255 },
    picture: { type: String, maxLength: 255 },
    isGoogleAuthLogin: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
const User = (0, mongoose_1.model)('Users', userSchema);
exports.default = User;
