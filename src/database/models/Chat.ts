import { Schema, model } from "mongoose";

const chat = new Schema({
    users:[{
        user: String
    }],
    messages: [{
        message: String,
        sent_by: String,
        date: {
            type: Date,
            default: Date.now
        }
    }]
});

export default model("chat", chat);