"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const authController_1 = __importDefault(require("../controllers/authController"));
const router = express_1.default.Router();
router.get('/google/callback', passport_1.default.authenticate('google', {
    session: false,
    failureRedirect: '/',
}), (req, res) => {
    res.status(200).json({
        success: true,
        message: 'User logged in successfully!',
        data: { token: req.user },
    });
});
router.post('/signIn', authController_1.default.signIn);
router.post('/signUp', authController_1.default.signUp);
router.post('/validateEmail', authController_1.default.validateEmail);
exports.default = router;
