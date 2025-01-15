import mongoose, {Schema} from "mongoose";

const ClothingTypeSchema = new Schema({
    total_available: { type: Number, default: 0 },
    title: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    type: { type: String, enum: ["adult", "kids"], required: true },
    image: String,
    purchase_price: { type: Number, required: true },
    selling_price: { type: Number, required: true },
});

export default mongoose.model<Document>('ClothingType', ClothingTypeSchema);
