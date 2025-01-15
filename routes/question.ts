import express from "express";
import {getQuestions} from "../controllers/question";
const router = express.Router();

router.get("/questions/:sessionId", getQuestions)

export default router;
