"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zapRouter = void 0;
const express_1 = require("express");
const middlware_1 = require("../middlware");
const router = (0, express_1.Router)();
router.post("/", middlware_1.authMiddleware, (req, res) => {
});
router.get("/", middlware_1.authMiddleware, (req, res) => {
});
router.get("/:zapId", middlware_1.authMiddleware, (req, res) => {
});
exports.zapRouter = router;
