import mongoose, {Schema, Types} from "mongoose";
import {Area} from "./types";
import {toZonedTime} from "date-fns-tz";

const DeliverySchema = new Schema({
    address: { type: String, required: true },
    area: { type: String, enum: Object.values(Area), required: true },
    coordinates: {
        lat: Number,
        lng: Number,
    },
    customer_id: { type: Types.ObjectId, ref: 'Customer', required: true },
    last_updated: { type: Date, default: toZonedTime(new Date(), "Africa/Nairobi") },
});

DeliverySchema.pre("save", function (next) {
    this.last_updated = toZonedTime(new Date(), "Africa/Nairobi");
    next();
});

export default mongoose.model<Document>('DeliveryAddresses', DeliverySchema);
