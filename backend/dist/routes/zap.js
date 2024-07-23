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
Object.defineProperty(exports, "__esModule", { value: true });
exports.zapRouter = void 0;
const express_1 = require("express");
const middlware_1 = require("../middlware");
const db_1 = require("../db");
const schema_1 = require("../schema");
const router = (0, express_1.Router)();
// submit zap endpoint
router.post("/", middlware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const id = req.id;
    const body = req.body;
    const parsedData = schema_1.zapSchema.safeParse(body);
    if (!parsedData.success)
        return res.status(500).json({ message: "Invalid inputs" });
    const { availableTrigger, actions } = parsedData.data;
    const zapRun = yield db_1.prismaClient.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const zap = yield tx.zap.create({
            data: {
                userId: parseInt(id),
                triggerId: "123",
                actions: {
                    create: actions.map((it, index) => ({
                        actionId: it.actionId,
                    }))
                }
            }
        });
        const trigger = yield tx.trigger.create({
            data: {
                triggerId: availableTrigger,
                zapId: zap.id
            }
        });
        yield tx.zap.update({
            where: { id: zap.id },
            data: {
                triggerId: trigger.id
            }
        });
        return zap;
    }));
    return res.json({ zapRun });
}));
// get all zaps
router.get("/", middlware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const id = req.id;
    const zap = yield db_1.prismaClient.zap.findMany({
        where: {
            userId: id
        },
        include: {
            trigger: {
                include: {
                    type: true
                }
            },
            actions: {
                include: {
                    type: true
                }
            }
        }
    });
    return res.json({ zap });
}));
// get particular zap
router.get("/:zapId", middlware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const zapId = req.params.zapId;
    //@ts-ignore
    const id = req.id;
    const zap = yield db_1.prismaClient.zap.findFirst({
        where: {
            userId: id,
            id: zapId
        },
        include: {
            trigger: {
                include: {
                    type: true
                }
            },
            actions: {
                include: {
                    type: true
                }
            }
        }
    });
    return res.json({ zap });
}));
exports.zapRouter = router;
