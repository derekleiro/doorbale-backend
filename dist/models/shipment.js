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
const ShipmentSchema = new mongoose_1.Schema({
    supplier_id: { type: mongoose_1.Types.ObjectId, ref: 'Supplier' },
    assigned_to: { type: mongoose_1.Types.ObjectId, ref: 'InternalUser' },
    items_bought: [
        {
            clothing_id: { type: mongoose_1.Types.ObjectId, ref: 'ClothingType' },
            clothing_type: { type: String, required: true },
            quantity: { type: Number, required: true },
        },
    ],
    total_items_bought: { type: Number, required: true },
    total_price: { type: Number, required: true },
    payment_reference: String,
    current_process: { type: String, enum: Object.values(types_1.Process) },
    collaboration_activity: [{
            employee_id: { type: mongoose_1.Types.ObjectId, ref: 'InternalUser', required: true },
            employee_name: { type: String, required: true },
            process_id: { type: mongoose_1.Types.ObjectId, ref: 'Process', required: true },
        }],
});
exports.default = mongoose_1.default.model('Shipment', ShipmentSchema);
