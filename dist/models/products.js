"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const slugify_mongoose_1 = __importDefault(require("slugify-mongoose"));
const productSchema = new mongoose_1.Schema({
    slug: { type: String, slug: 'name', unique: true },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Categories',
        required: true,
    },
    image: { type: String },
    name: { type: String, maxLength: 255, required: true },
    description: { type: String, maxLength: 500 },
    price: { type: mongoose_1.Schema.Types.Decimal128, required: true },
    featured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
productSchema.plugin(slugify_mongoose_1.default);
const Product = (0, mongoose_1.model)('Products', productSchema);
exports.default = Product;
