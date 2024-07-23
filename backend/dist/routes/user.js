"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const schema_1 = require("../schema");
const index_1 = require("../backend/index");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const middlware_1 = require("../middlware");
const router = (0, express_1.Router)();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const parsedData = schema_1.SignUpSchema.safeParse(body);
    if (!parsedData.success)
        return { message: "Invalid Inputs" };
    const { email, password, name } = parsedData.data;
    const existingUser = yield index_1.prismaClient.user.findFirst({
        where: {
            email: email
        }
    });
    if (existingUser)
        return { message: "User Already Exists" };
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const user = yield index_1.prismaClient.user.create({
        data: {
            email,
            password: hashedPassword,
            name
        }
    });
    return res.status(200).json({
        message: "User Created Successfully",
        user
    });
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const parsedData = schema_1.SignInSchema.safeParse(body);
    if (!parsedData.success)
        return { message: "Invalid Inputs" };
    const { email, password } = parsedData.data;
    const user = yield index_1.prismaClient.user.findFirst({
        where: {
            email
        },
        select: {
            id: true,
            email: true,
            password: true
        }
    });
    if (!user)
        return res.status(404).json({ message: "No Account Exists" });
    const confirmPassword = yield bcryptjs_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
    if (!confirmPassword)
        return res.status(401).json({ message: "Invalid credentials" });
    // sign the jwt
    const token = jsonwebtoken_1.default.sign({
        id: user.id
    }, config_1.JWT_PASSWORD);
    res.json({
        token
    });
}));
router.get("/", middlware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // getting this req.id from authMiddleware from the payload
    // @ts-ignore
    const id = req.id;
    console.log(" id : ", id);
    const user = yield index_1.prismaClient.user.findFirst({
        where: {
            id
        },
        select: {
            email: true,
            name: true
        }
    });
    return res.status(200).json({
        user
    });
}));
exports.userRouter = router;
