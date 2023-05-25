"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_1 = __importDefault(require("../controllers/usersController"));
const router = express_1.default.Router();
router.get('/getUser/:email', usersController_1.default.getUser);
router.get('/getUsers', usersController_1.default.getUsers);
router.post('/addAddress', usersController_1.default.addAddress);
router.put('/updateAddress', usersController_1.default.updateAddress);
exports.default = router;
