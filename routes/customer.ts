import express from "express";
import {requireAuth} from "@clerk/express";
const router = express.Router();

//router.get("/delivery/:id", requireAuth())
router.patch("/delivery/:id", requireAuth())
