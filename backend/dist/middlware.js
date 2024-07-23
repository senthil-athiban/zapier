"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(" token : ", token);
    try {
        const payload = jsonwebtoken_1.default.verify(token, config_1.JWT_PASSWORD);
        console.log(" payload : ", payload);
        // @ts-ignore
        req.id = payload.id;
        next();
    }
    catch (error) {
        return res.status(404).json({ message: "Un Authorized" });
    }
};
exports.authMiddleware = authMiddleware;
