"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_jwt_1 = require("passport-jwt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_js_1 = __importDefault(require("../models/users.js"));
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    scope: ['profile', 'email'],
}, async (accessToken, refreshToken, payload, callback) => {
    const data = payload._json;
    const user = await users_js_1.default.findOneAndUpdate({ email: data.email }, {
        firstName: data.given_name,
        lastName: data.family_name,
        email: data.email,
        picture: data.picture,
        isGoogleAuthLogin: true,
    }, {
        new: true,
        upsert: true,
    });
    const token = jsonwebtoken_1.default.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    callback(null, token);
}));
passport_1.default.serializeUser((payload, callback) => {
    callback(null, payload);
});
passport_1.default.deserializeUser((payload, callback) => {
    callback(null, payload);
});
const jwtOptions = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};
passport_1.default.use(new passport_jwt_1.Strategy(jwtOptions, async (payload, callback) => {
    if (payload.exp > Date.now() / 1000) {
        const user = (await users_js_1.default.findOne({
            email: payload.email,
            isActive: true,
        }));
        callback(null, user);
    }
    else {
        callback(null, false);
    }
}));
