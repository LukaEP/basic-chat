import { Schema, model } from "mongoose";

const user = new Schema({
    name: {
        type: String,
        unique: true
    },
    password: String
});

export default model("users", user);