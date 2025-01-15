import mongoose, {Schema, Types} from "mongoose";
import {Process} from "./types";
import {toZonedTime} from "date-fns-tz";

const ProcessSchema = new Schema({
    employee_id: {type: Types.ObjectId, ref: 'InternalUser', required: true},
    order_id: {type: Types.ObjectId, ref: 'Order'},
    shipment_id: {type: Types.ObjectId, ref: 'Shipment'},
    description: {type: String, required: true},
    label: {type: String, enum: Object.values(Process), required: true},
    start_time: {type: Date, default: toZonedTime(new Date(), "Africa/Nairobi")},
    end_time: {type: Date},
});

export default mongoose.model<Document>('Process', ProcessSchema);
