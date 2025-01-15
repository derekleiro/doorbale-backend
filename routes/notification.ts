import express from "express";
import {smsNotify} from "../controllers/notification";
import {requireAuth} from "@clerk/express";
const router = express.Router();

router.post("/notify/sms", requireAuth(), smsNotify);