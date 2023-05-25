"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoriesController_1 = __importDefault(require("../controllers/categoriesController"));
const router = express_1.default.Router();
router.get('/getCategories', categoriesController_1.default.getCategories);
router.post('/addCategory', categoriesController_1.default.addCategory);
exports.default = router;
