import { Model, model, Document } from "mongoose";

interface IMessages {
    from: String,
    message: String
}

interface IChat extends Document {
    messages: Array<IMessages>
}

class ChatRepository {
    private Chat: Model<IChat>;

    constructor() {
        this.Chat = model("chat");
    }

    hello() {
        console.log("sss");
    }

}

export { ChatRepository };