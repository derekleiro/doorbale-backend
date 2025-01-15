import {Gender} from "./types";
import mongoose, {Schema, Types} from "mongoose";
import {toZonedTime} from "date-fns-tz";

const date = new Date()

const CustomerSchema = new Schema({
    created_on: { type: Date, default: toZonedTime(date, "Africa/Nairobi") },
    last_updated: { type: Date, default: toZonedTime(date, "Africa/Nairobi") },
    gender: { type: String, enum: Object.values(Gender), default: Gender.Female },
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
    tags: [{ type: Types.ObjectId, ref: 'Tag' }],
    last_order_date: { type: Date, default: toZonedTime(date, "Africa/Nairobi") },
});

CustomerSchema.pre("save", function (next) {
    this.last_updated = toZonedTime(new Date(), "Africa/Nairobi");
    next();
});

export default mongoose.model<Document>('Customer', CustomerSchema);
