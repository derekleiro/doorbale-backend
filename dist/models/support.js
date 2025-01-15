"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const VerificationSchema = new mongoose_1.Schema({
    phone_code: String,
    expiry: Date,
});
const ScoreSchema = new mongoose_1.Schema({
    conscientious: Number,
    neurotic: Number,
    openness: Number,
    agreeable: Number,
    extraversion: Number,
});
const CollaborationSchema = new mongoose_1.Schema({
    employee_id: { type: mongoose_1.Types.ObjectId, ref: 'Employee' },
    time_assigned: Date,
    assigned_process: String,
});
