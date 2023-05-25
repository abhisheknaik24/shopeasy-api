"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = __importDefault(require("../models/products"));
const getProduct = async (req, res) => {
    if (req.method === 'GET') {
        const { id } = req.params;
        if (id) {
            try {
                let product = (await products_1.default.findOne({
                    _id: id,
                    isActive: true,
                }));
                res.status(200).json({
                    success: true,
                    message: 'Product fetched successfully!',
                    data: { product: product },
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
                message: 'Request params is missing!',
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
const getProducts = async (req, res) => {
    if (req.method === 'GET') {
        const { skip, limit } = req.query;
        try {
            const products = await products_1.default.find({ isActive: true })
                .skip(Number(skip))
                .limit(Number(limit));
            res.status(200).json({
                success: true,
                message: 'Products fetched successfully!',
                data: { products: products },
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
const filterProducts = async (req, res) => {
    if (req.method === 'POST') {
        const { skip, limit } = req.query;
        const { minPrice, maxPrice } = req.body;
        if (minPrice && maxPrice) {
            try {
                let products = await products_1.default.find({
                    price: { $lte: maxPrice },
                    isActive: true,
                })
                    .skip(Number(skip))
                    .limit(Number(limit));
                res.status(200).json({
                    success: true,
                    message: 'Products fetched successfully!',
                    data: { products: products },
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
const addProduct = async (req, res) => {
    if (req.method === 'POST') {
        const { category, name, description, price } = req.body;
        if (req.file && category && name && description && price) {
            try {
                const product = new products_1.default({
                    category: category,
                    image: req.file.originalname,
                    name: name,
                    description: description,
                    price: price,
                });
                await product.save();
                res.status(200).json({
                    success: true,
                    message: 'Product added successfully!',
                    data: { product: product },
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
const updateProduct = async (req, res) => {
    if (req.method === 'PUT') {
        const { id, category, name, description, price } = req.body;
        if (id && req.file && category && name && description && price) {
            try {
                let product = (await products_1.default.updateOne({ _id: id }, {
                    category: category,
                    image: req.file.originalname,
                    name: name,
                    description: description,
                    price: price,
                }));
                res.status(200).json({
                    success: true,
                    message: 'Product updated successfully!',
                    data: { product: product },
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
const deleteProduct = async (req, res) => {
    if (req.method === 'DELETE') {
        const { id } = req.params;
        if (id) {
            try {
                await products_1.default.deleteOne({ _id: id });
                let products = await products_1.default.find({ isActive: true });
                res.status(200).json({
                    success: true,
                    message: 'Product deleted successfully!',
                    data: { products: products },
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
                message: 'Request params is missing!',
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
    getProduct,
    getProducts,
    filterProducts,
    addProduct,
    updateProduct,
    deleteProduct,
};
