import mongoose, {Schema, Types} from "mongoose";

const ScoreSchema = new Schema({
    order_id: { type: Types.ObjectId, required: true, ref: 'Order' },
    customer_id: { type: Types.ObjectId, required: true, ref: 'Customer' },
    conscientious: { type: Number, required: true },
    neurotic: { type: Number, required: true },
    openness: { type: Number, required: true },
    agreeable: { type: Number, required: true },
    extraversion: { type: Number, required: true },
});

export default mongoose.model<Document>('TasteScore', ScoreSchema);
