"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zapSchema = exports.SignInSchema = exports.SignUpSchema = void 0;
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
exports.zapSchema = zod_1.z.object({
    availableTrigger: zod_1.z.string(),
    actions: zod_1.z.array(zod_1.z.object({
        actionId: zod_1.z.string(),
        actionMetaData: zod_1.z.any()
    }))
});
