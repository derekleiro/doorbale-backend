import express from "express";
import {
    emailLogin,
    emailRegister, getAccount,
    phoneLogin,
    phoneRegister,
    verifyEmail2FA, verifyPhone2FA, verifyPIN
} from "../controllers/auth";
import {requireAuth} from "@clerk/express";

const router = express.Router();

// Admin auth routes
router.post("/auth/admin/register", emailRegister);
router.post("/auth/admin/login", emailLogin);
router.post("/auth/admin/2FA/email/verify", verifyEmail2FA);
router.post("/auth/admin/2FA/pin/verify", verifyPIN);

// Supplier and customer auth routes
router.post("/auth/register/:sessionId", phoneRegister);
router.post("/auth/login", phoneLogin);
router.post("/auth/2FA/phone/verify", verifyPhone2FA);

router.get("/auth/account/:id", requireAuth(), getAccount);

export default router;
