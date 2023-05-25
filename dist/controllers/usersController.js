"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("../models/users"));
const addresses_1 = __importDefault(require("../models/addresses"));
const getUser = async (req, res) => {
    if (req.method === 'GET') {
        const { email } = req.params;
        if (email) {
            try {
                let user = (await users_1.default.findOne({
                    email: email,
                    isActive: true,
                }));
                res.status(200).json({
                    success: true,
                    message: 'User fetched successfully!',
                    data: { user: user },
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
const getUsers = async (req, res) => {
    if (req.method === 'GET') {
        const { skip, limit } = req.query;
        try {
            let users = await users_1.default.find({ isActive: true })
                .skip(Number(skip))
                .limit(Number(limit));
            res.status(200).json({
                success: true,
                message: 'Users fetched successfully!',
                data: { users: users },
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
const addAddress = async (req, res) => {
    if (req.method === 'POST') {
        const { email, address } = req.body;
        if (email && address) {
            try {
                const user = (await users_1.default.findOne({
                    email: email,
                    isActive: true,
                }));
                const addressData = new addresses_1.default({
                    user: user._id,
                    address: address,
                });
                await addressData.save();
                const addresses = await addresses_1.default.find({ user: user._id });
                if (addresses.length === 1) {
                    await addresses_1.default.updateOne({ user: user._id }, { isActive: true });
                }
                res.status(200).json({
                    success: true,
                    message: 'Address added successfully!',
                    data: { addresses: addresses },
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
const updateAddress = async (req, res) => {
    if (req.method === 'PUT') {
        const { email, addressId } = req.body;
        if (email && addressId) {
            try {
                let user = (await users_1.default.findOne({
                    email: email,
                    isActive: true,
                }));
                const addresses = await addresses_1.default.find({ user: user._id });
                const updatedAddresses = addresses.map((address) => ({
                    ...address.toObject(),
                    isActive: address._id.toString() === addressId,
                }));
                await addresses_1.default.updateMany({ user: user._id }, updatedAddresses);
                res.status(200).json({
                    success: true,
                    message: 'Address updated successfully!',
                    data: { addresses: updatedAddresses },
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
    getUser,
    getUsers,
    addAddress,
    updateAddress,
};
