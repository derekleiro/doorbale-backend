import mongoose, {Schema, Types} from "mongoose";
import {Process} from "./types";

const ShipmentSchema = new Schema({
    supplier_id: { type: Types.ObjectId, ref: 'Supplier' },
    assigned_to: { type: Types.ObjectId, ref: 'InternalUser' },
    items_bought: [
        {
            clothing_id: { type: Types.ObjectId, ref: 'ClothingType' },
            clothing_type: { type: String, required: true },
            quantity: { type: Number, required: true },
        },
    ],
    total_items_bought: { type: Number, required: true },
    total_price: { type: Number, required: true },
    payment_reference: String,
    current_process: { type: String, enum: Object.values(Process) },
    collaboration_activity: [{
        employee_id: {type: Types.ObjectId, ref: 'InternalUser', required: true},
        employee_name: {type: String, required: true},
        process_id: {type: Types.ObjectId, ref: 'Process', required: true},
    }],
});

export default mongoose.model<Document>('Shipment', ShipmentSchema);
