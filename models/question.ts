import mongoose, {Schema} from "mongoose";

const QuestionSchema = new Schema({
    title: { type: String, required: true },
    dimension: { type: String, required: true },
    facet: { type: String, required: true },
});

export default mongoose.model<Document>('Question', QuestionSchema);
