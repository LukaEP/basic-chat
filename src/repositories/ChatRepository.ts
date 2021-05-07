import { Model, model, Document } from "mongoose";

interface IChat extends Document {
    from: String,
    to: String,
    message: String
}

interface IUsers {
    me: String,
    it: String
}

class ChatRepository {
    private Chat: Model<IChat>;

    constructor() {
        this.Chat = model("chat");
    }

    async listChats(user: String) {
        const chats = await this.Chat.find({ "users.user": user });

        return chats;
    }

    async createNewChat(users: IUsers) {
        const newChat = new this.Chat({
            users: [
                {
                    user: users.me
                },
                {
                    user: users.it
                }
            ]
        });

        return await newChat.save();
    }
}

export { ChatRepository };