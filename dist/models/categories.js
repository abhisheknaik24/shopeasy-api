"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const slugify_mongoose_1 = __importDefault(require("slugify-mongoose"));
const categorySchema = new mongoose_1.Schema({
    slug: { type: String, slug: 'name', unique: true },
    name: { type: String, maxLength: 255, required: true, unique: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
categorySchema.plugin(slugify_mongoose_1.default);
const Category = (0, mongoose_1.model)('Categories', categorySchema);
exports.default = Category;
