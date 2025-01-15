import mongoose, {Schema, Types} from "mongoose";
import {OrderType, Process} from "./types";
import {toZonedTime} from "date-fns-tz";

const date = new Date()

const OrderSchema = new Schema({
    type: {type: String, enum: Object.values(OrderType), required: true},
    customer_id: {type: Types.ObjectId, ref: 'Customer'},
    delivery_id: {type: Types.ObjectId, ref: 'Delivery'},
    score_id: {type: Types.ObjectId, ref: 'TasteScore'},
    items_sold: [
        {
            clothing_id: {type: Types.ObjectId, ref: 'ClothingType'},
            clothing_type: String,
            quantity_sold: Number,
        },
    ],
    kids_clothing: [{
        gender: {type: String, required: true},
        age: {type: String, required: true},
        clothes_needed: [{type: Types.ObjectId, ref: 'ClothingType', required: true}],
    }],
    number_of_clothes: Number,
    total_items_purchased: Number,
    payment_reference: String,
    current_process: {type: String, enum: Object.values(Process), required: true},
    assigned_to: {type: Types.ObjectId, ref: 'InternalUser', required: true},
    created_on: {type: Date, default: toZonedTime(date, "Africa/Nairobi")},
    last_updated: {type: Date, default: toZonedTime(date, "Africa/Nairobi")},
    feedback_id: {type: Types.ObjectId, ref: 'Feedback'},
    reference_style_ids: [{type: Types.ObjectId, ref: 'Style', required: true}],
    collaboration_activity: [{
        employee_id: {type: Types.ObjectId, ref: 'InternalUser', required: true},
        employee_name: {type: String, required: true},
        process_id: {type: Types.ObjectId, ref: 'Process', required: true},
    }],
});

OrderSchema.pre("save", function (next) {
    this.last_updated = toZonedTime(new Date(), "Africa/Nairobi");
    next();
});

export default mongoose.model<Document>('Order', OrderSchema);
