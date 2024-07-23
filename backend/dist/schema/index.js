"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInSchema = exports.SignUpSchema = void 0;
const zod_1 = require("zod");
exports.SignUpSchema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    email: zod_1.z.string().min(5),
    password: zod_1.z.string().min(4)
});
exports.SignInSchema = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string()
});
