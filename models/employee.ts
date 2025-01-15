import mongoose, {Schema} from "mongoose";
import {Role} from "./types";
import {toZonedTime} from "date-fns-tz";

const TeamSchema = new Schema({
    type: { type: String, enum: ['Internal', 'External'], required: true },
    roles: [{ type: String, enum: Object.values(Role), required: true }],
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone_number: { type: String, required: true },
    verified: { type: Boolean, required: true },
    performance_score: { type: Number, default: 0 },
    unique_device_ids: [{ type: String, required: true }],
    last_login: { type: Date, default: toZonedTime(new Date(), "Africa/Nairobi") },
    encrypted_pin: { type: String, required: true },
});

TeamSchema.pre('save', function(next) {
    this.last_login = toZonedTime(new Date(), "Africa/Nairobi");
    next()
})

export default mongoose.model<Document>('Team', TeamSchema);
