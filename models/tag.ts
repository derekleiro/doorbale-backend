import mongoose, {Schema} from "mongoose";

const TagSchema = new Schema({
    label: { type: String, required: true },
    description: { type: String, required: true },
});

export default mongoose.model<Document>('Tag', TagSchema);
