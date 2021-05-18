import { Schema, model } from "mongoose";

const user = new Schema({
    name: {
        type: String,
        unique: true
    },
    password: String,
    socket_id: String
});

export default model("users", user);