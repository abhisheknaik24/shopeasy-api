"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = __importDefault(require("../models/users"));
const otps_1 = __importDefault(require("../models/otps"));
const signIn = async (req, res) => {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        if (email && password) {
            try {
                const userExists = await users_1.default.exists({ email: email, isActive: true });
                if (userExists) {
                    const user = (await users_1.default.findOne({ email: email }));
                    const match = await bcrypt_1.default.compare(password, user.password);
                    if (match) {
                        const token = jsonwebtoken_1.default.sign({ email: user.email }, process.env.JWT_SECRET, {
                            expiresIn: '1h',
                        });
                        res.status(200).json({
                            success: true,
                            message: 'User sign in successfully!',
                            data: { token: token },
                        });
                    }
                    else {
                        res.status(400).json({
                            success: false,
                            message: 'Wrong password!',
                        });
                    }
                }
                else {
                    res.status(400).json({
                        success: false,
                        message: 'User not sign up!',
                    });
                }
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
const sendValidateEmailCode = async (email, otp) => {
    try {
        if (email && otp) {
            const transporter = nodemailer_1.default.createTransport({
                host: process.env.EMAIL_SMTP_HOST,
                port: Number(process.env.EMAIL_SMTP_PORT) || 456,
                secure: process.env.EMAIL_SECURE === 'true',
                auth: {
                    user: process.env.EMAIL_AUTH_USER,
                    pass: process.env.EMAIL_AUTH_PASS,
                },
            });
            const mailOptions = {
                from: process.env.EMAIL_AUTH_USER,
                to: email,
                subject: 'OTP code for shopeasy login',
                html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>OTP code for shopeasy login</title>
        </head>
        <body style="margin: 0px; background: #f8f8f8">
            <div width="100%"
                style="background: #f8f8f8; padding: 0px 0px; font-family: arial; line-height: 28px; height: 100%; width: 100%; color: #514d6a;">
                <div style="max-width: 700px; padding: 50px 0; margin: 0px auto; font-size: 14px;">
                    <div style="padding: 40px; background: #fff">
                        <table border="0" cellpadding="0" cellspacing="0" style="width: 100%">
                            <tbody>
                                <tr>
                                    <td>
                                        <b>Hi,</b>
                                        <p>OTP : ${otp}</p>
                                        <p style="margin: 0; padding: 0;"><b>Thanks & Regards,</b></p>
                                        <p style="margin: 0; padding: 0;"><b>Shopeasy Team</b></p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </body>
        </html>`,
            };
            const result = await transporter.sendMail(mailOptions);
            return result.accepted.length > 0;
        }
        return false;
    }
    catch (error) {
        return false;
    }
};
const signUp = async (req, res) => {
    if (req.method === 'POST') {
        const { firstName, lastName, email, password } = req.body;
        if (firstName && lastName && email && password) {
            try {
                const userExists = await users_1.default.exists({ email: email, isActive: true });
                if (!userExists) {
                    const salt = await bcrypt_1.default.genSalt(10);
                    const hashPassword = await bcrypt_1.default.hash(password, salt);
                    const user = new users_1.default({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: hashPassword,
                    });
                    await user.save();
                    const code = Math.floor(100000 + Math.random() * 900000);
                    await sendValidateEmailCode(email, code);
                    const otp = new otps_1.default({
                        user: user._id,
                        otp: code,
                    });
                    await otp.save();
                    res.status(200).json({
                        success: true,
                        message: 'OTP sent successfully!',
                    });
                }
                else {
                    res.status(400).json({
                        success: false,
                        message: 'User already sign up!',
                    });
                }
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
const validateEmail = async (req, res) => {
    if (req.method === 'POST') {
        const { email, otp } = req.body;
        if (email && otp) {
            try {
                const user = (await users_1.default.findOne({ email: email }));
                const otpData = await otps_1.default.findOne({ user: user._id }).sort({
                    createdAt: 'desc',
                });
                if (Number(otp) === Number(otpData?.otp)) {
                    const token = jsonwebtoken_1.default.sign({ email: user.email }, process.env.JWT_SECRET, {
                        expiresIn: '1h',
                    });
                    res.status(200).json({
                        success: true,
                        message: 'User sign in successfully!',
                        data: { token: token },
                    });
                }
                else {
                    res.status(400).json({
                        success: false,
                        message: 'Wrong otp!',
                    });
                }
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
    signIn,
    signUp,
    validateEmail,
};
