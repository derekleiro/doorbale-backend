import mongoose, {Schema, Types} from "mongoose";

const VerificationSchema = new Schema({
    user_id: { type: Types.ObjectId, ref: 'Customer' },
    requested_on: { type: Date, required: true },
    invalidated: { type: Boolean, default: false },
    code: { type: String, required: true },
    expiry: { type: Date, required: true },
});

export default mongoose.model<Document>('AuthVerification', VerificationSchema);
