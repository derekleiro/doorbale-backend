import mongoose, {Schema, Types} from "mongoose";
import {PaymentProvider} from "./types";

const PaymentSchema = new Schema({
    customer_id: { type: Types.ObjectId, ref: 'Customer', required: true },
    order_id: { type: Types.ObjectId, ref: 'Order', required: true },
    customer_name: { type: String, required: true },
    reference: { type: String, required: true },
    provider: { type: String, enum: Object.values(PaymentProvider), required: true },
    time_of_payment: { type: Date, required: true },
    amount: { type: Number, required: true },
});

export default mongoose.model<Document>('Payment', PaymentSchema);
