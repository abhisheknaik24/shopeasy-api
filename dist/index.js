"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./config");
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
require("./middlewares/passport");
const passport_1 = __importDefault(require("passport"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const categoriesRoutes_1 = __importDefault(require("./routes/categoriesRoutes"));
const productsRoutes_1 = __importDefault(require("./routes/productsRoutes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.static('public'));
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
    methods: process.env.CLIENT_METHODS,
    preflightContinue: false,
    optionsSuccessStatus: 204,
}));
app.use(passport_1.default.initialize());
app.use('/api', passport_1.default.authenticate('jwt', { session: false }));
app.use('/auth', authRoutes_1.default);
app.use('/api/users', usersRoutes_1.default);
app.use('/api/categories', categoriesRoutes_1.default);
app.use('/api/products', productsRoutes_1.default);
(async () => {
    try {
        if (mongoose_1.default.connections[0].readyState !== 1) {
            await mongoose_1.default.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        }
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    }
    catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
})();
