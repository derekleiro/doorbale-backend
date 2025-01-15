import express from "express";
import {requireAuth} from "@clerk/express";
const router = express.Router();


router.post("/order/new", requireAuth())
router.get("/order/:id", requireAuth())
