import express from "express";
import {getClothing} from "../controllers/clothing";
const router = express.Router();

router.get("/clothing/type/:type/:sessionId", getClothing)

export default router;
