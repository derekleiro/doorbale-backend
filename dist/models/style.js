"use strict";
const StyleSchema = new Schema({
    name: String,
    reference_image: String,
    score: {
        conscientious: { type: Number, required: true },
        neurotic: { type: Number, required: true },
        openness: { type: Number, required: true },
        agreeable: { type: Number, required: true },
        extraversion: { type: Number, required: true },
    },
});
