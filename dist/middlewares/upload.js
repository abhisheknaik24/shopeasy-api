"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        let dir = './public/images';
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir, { recursive: true });
        }
        callback(null, dir);
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
exports.default = upload;
