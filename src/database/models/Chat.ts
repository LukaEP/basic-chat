import { Schema, model } from "mongoose";

const chat = new Schema({
    messages: [{
        from: String,
        message: String
    }]
});

export default model("chat", chat);