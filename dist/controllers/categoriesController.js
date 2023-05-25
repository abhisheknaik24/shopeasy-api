"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categories_1 = __importDefault(require("../models/categories"));
const getCategories = async (req, res) => {
    if (req.method === 'GET') {
        const { skip, limit } = req.query;
        try {
            const categories = await categories_1.default.find({ isActive: true })
                .skip(Number(skip))
                .limit(Number(limit));
            res.status(200).json({
                success: true,
                message: 'Categories fetched successfully!',
                data: { categories: categories },
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: String(error),
            });
        }
    }
    else {
        res.status(400).json({
            success: false,
            message: 'Request method is not allowed!',
        });
    }
};
const addCategory = async (req, res) => {
    if (req.method === 'POST') {
        const { name } = req.body;
        if (name) {
            try {
                const category = new categories_1.default({
                    name: name,
                });
                await category.save();
                res.status(200).json({
                    success: true,
                    message: 'Category added successfully!',
                    data: { category: category },
                });
            }
            catch (error) {
                res.status(400).json({
                    success: false,
                    message: String(error),
                });
            }
        }
        else {
            res.status(400).json({
                success: false,
                message: 'Request body is missing!',
            });
        }
    }
    else {
        res.status(400).json({
            success: false,
            message: 'Request method is not allowed!',
        });
    }
};
exports.default = {
    getCategories,
    addCategory,
};
