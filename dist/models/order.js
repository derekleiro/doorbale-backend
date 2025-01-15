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
const mongoose_1 = __importStar(require("mongoose"));
const types_1 = require("./types");
const date_fns_tz_1 = require("date-fns-tz");
const date = new Date();
const OrderSchema = new mongoose_1.Schema({
    type: { type: String, enum: Object.values(types_1.OrderType), required: true },
    customer_id: { type: mongoose_1.Types.ObjectId, ref: 'Customer' },
    delivery_id: { type: mongoose_1.Types.ObjectId, ref: 'Delivery' },
    score_id: { type: mongoose_1.Types.ObjectId, ref: 'TasteScore' },
    items_sold: [
        {
            clothing_id: { type: mongoose_1.Types.ObjectId, ref: 'ClothingType' },
            clothing_type: String,
            quantity_sold: Number,
        },
    ],
    number_of_clothes: Number,
    total_items_purchased: Number,
    payment_reference: String,
    current_process: { type: String, enum: Object.values(types_1.Process), required: true },
    assigned_to: { type: mongoose_1.Types.ObjectId, ref: 'InternalUser', required: true },
    created_on: { type: Date, default: (0, date_fns_tz_1.toZonedTime)(date, "Africa/Nairobi") },
    last_updated: { type: Date, default: (0, date_fns_tz_1.toZonedTime)(date, "Africa/Nairobi") },
    feedback_id: { type: mongoose_1.Types.ObjectId, ref: 'Feedback' },
    reference_style_ids: [{ type: mongoose_1.Types.ObjectId, ref: 'Style', required: true }],
    collaboration_activity: [{
            employee_id: { type: mongoose_1.Types.ObjectId, ref: 'InternalUser', required: true },
            employee_name: { type: String, required: true },
            process_id: { type: mongoose_1.Types.ObjectId, ref: 'Process', required: true },
        }],
});
OrderSchema.pre("save", function (next) {
    this.last_updated = (0, date_fns_tz_1.toZonedTime)(new Date(), "Africa/Nairobi");
    next();
});
exports.default = mongoose_1.default.model('Order', OrderSchema);
