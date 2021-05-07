import { Model, model, Document } from "mongoose";

interface IChat extends Document {
    from: String,
    to: String,
    message: String
}

class ChatRepository {
    private Chat: Model<IChat>;

    constructor() {
        this.Chat = model("chat");
    }
}

export { ChatRepository };