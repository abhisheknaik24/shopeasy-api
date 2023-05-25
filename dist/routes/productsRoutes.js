"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productsController_1 = __importDefault(require("../controllers/productsController"));
const upload_1 = __importDefault(require("../middlewares/upload"));
const router = express_1.default.Router();
router.get('/getProduct/:id', productsController_1.default.getProduct);
router.get('/getProducts', productsController_1.default.getProducts);
router.post('/filterProducts', productsController_1.default.filterProducts);
router.post('/addProduct', upload_1.default.single('image'), productsController_1.default.addProduct);
router.put('/updateProduct', upload_1.default.single('image'), productsController_1.default.updateProduct);
router.delete('/deleteProduct/:id', productsController_1.default.deleteProduct);
exports.default = router;
