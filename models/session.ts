import mongoose, {Schema, Types} from "mongoose";
import {toZonedTime} from "date-fns-tz";
import {Gender, OrderType} from "./types";

interface ISession extends Document {
    userId: string;
    last_updated: Date;
    completed: boolean;
    startTime: Date;
    sessionId: string;
    phoneNumber: string;
    currentStep: string;
    data: {
        analysis: {};
        about: {
            orderType: string;
            gender: string;
            age: string;
            height: string;
            size: string;
            kids_clothing: {
                [key: number]: {
                    name: string,
                    gender: string,
                    age: string,
                    clothes_needed: string[],
                    complete: boolean,
                }
            }
        },
        clothingTypes: Types.ObjectId[];
        clothingPersonality: [{
            questionId: string;
            questionScore: {
                score: number;
                errorValue: number;
                marginOfError: number
            },
        }],
        review: Types.ObjectId
    };
}

const date = new Date()

const SessionSchema = new Schema({
    userId: {
        type: String,
        default: null,
    },
    last_updated: {
        type: Date,
        default: toZonedTime(date, "Africa/Nairobi"),
    },
    completed: {
        type: Boolean,
        default: false,
    },
    startTime: {
        type: Date,
        default: toZonedTime(date, "Africa/Nairobi"),
    },
    sessionId: {
        type: String,
        required: true
    },
    phoneNumber: String,
    currentStep: {
        type: String,
        required: true,
        enum: ["about", "clothingTypes", "clothingPersonality", "review", "thankYou"],
    },
    data: {
        analysis: {}, // Attributes analysed from the trait score e.g c1 and descriptions
        about: {
            orderType: {type: String, enum: Object.values(OrderType)},
            gender: {type: String, enum: Object.values(Gender), default: Gender.Female},
            age: String,
            height: String,
            size: String,
            kids_clothing: {
                type: Map,
                of: {
                    name: String,
                    gender: String,
                    age: String,
                    clothes_needed: [{type: Types.ObjectId, ref: 'ClothingType'}],
                    complete: Boolean,
                },
            },
        },
        clothingTypes: [{type: Types.ObjectId, ref: 'ClothingType'}],
        clothingPersonality: {
            type: Map,
            of: {
                questionId: String,
                questionScore: Number,
            },
        },
        review: {type: Types.ObjectId, ref: 'Delivery'}
    }
})

SessionSchema.pre("save", function (next) {
    this.last_updated = toZonedTime(new Date(), "Africa/Nairobi");
    next();
});

export default mongoose.model<ISession>('Session', SessionSchema);
