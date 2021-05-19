import { Schema, model } from "mongoose";

const user = new Schema({
    name: {
        type: String,
        unique: true
    },
    password: String,
    active_token: String
});

export default model("users", user);