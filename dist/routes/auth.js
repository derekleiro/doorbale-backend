"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const express_2 = require("@clerk/express");
const router = express_1.default.Router();
// Admin auth routes
router.post("/auth/admin/register", auth_1.emailRegister);
router.post("/auth/admin/login", auth_1.emailLogin);
router.post("/auth/admin/2FA/email/verify", auth_1.verifyEmail2FA);
router.post("/auth/admin/2FA/pin/verify", auth_1.verifyPIN);
// Supplier and customer auth routes
router.post("/auth/register/:sessionId", auth_1.phoneRegister);
router.post("/auth/login", auth_1.phoneLogin);
router.post("/auth/2FA/phone/verify", auth_1.verifyPhone2FA);
router.get("/auth/account/:id", (0, express_2.requireAuth)(), auth_1.getAccount);
exports.default = router;
