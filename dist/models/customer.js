"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const mongoose_1 = __importStar(require("mongoose"));
const date_fns_tz_1 = require("date-fns-tz");
const date = new Date();
const CustomerSchema = new mongoose_1.Schema({
    created_on: { type: Date, default: (0, date_fns_tz_1.toZonedTime)(date, "Africa/Nairobi") },
    last_updated: { type: Date, default: (0, date_fns_tz_1.toZonedTime)(date, "Africa/Nairobi") },
    gender: { type: String, enum: Object.values(types_1.Gender), default: types_1.Gender.Female },
    age: { type: String, required: true },
    height: { type: String, required: true },
    size: { type: String, required: true },
    // Encrypt this field
    test_score: {
        conscientious: Number,
        neurotic: Number,
        openness: Number,
        agreeable: Number,
        extraversion: Number,
    },
    phone_number: { type: String, required: true },
    email_address: { type: String, required: true },
    tags: [{ type: mongoose_1.Types.ObjectId, ref: 'Tag' }],
    last_order_date: { type: Date, default: (0, date_fns_tz_1.toZonedTime)(date, "Africa/Nairobi") },
});
CustomerSchema.pre("save", function (next) {
    this.last_updated = (0, date_fns_tz_1.toZonedTime)(new Date(), "Africa/Nairobi");
    next();
});
exports.default = mongoose_1.default.model('Customer', CustomerSchema);
