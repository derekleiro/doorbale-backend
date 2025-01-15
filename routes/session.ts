import express from "express";
import {checkSession, getSession, startSession, updateSession} from "../controllers/session";

const router = express.Router();

router.get("/session/:sessionId", checkSession);
router.post("/session/start", startSession);
router.post("/session/update", updateSession);
router.get("/session/:sessionId/:currentStep", getSession)

export default router;
