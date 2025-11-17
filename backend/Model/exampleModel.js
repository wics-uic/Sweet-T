import mongoose from "mongoose";

const exampleSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        index: true
    }
}, {
    collection: 'Examples'
});

export const Example = mongoose.model('Example', exampleSchema);

