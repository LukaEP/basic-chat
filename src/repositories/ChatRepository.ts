import { Model, model, Document, now } from "mongoose";
import { UserRepository } from "./UserRepository";

interface IChat extends Document {
    messages: Array<IMessages>,
    users: Array<IUsers>
}

interface IUsers {
    user: String
}

interface IMessages {
    message: String,
    sent_by: String,
    date: Date
}

interface IRequestUser {
    me: String,
    it: String
}

class ChatRepository {
    private Chat: Model<IChat>;
    private userRepository: UserRepository;

    constructor() {
        this.Chat = model("chat");
        this.userRepository = new UserRepository();
    }

    async listChats(user: String) {
        let usersChats = [];
        const chats = await this.Chat.find({ "users.user": user }).select('users _id');

        for await (let chat of chats) {
            let ouser = await this.userRepository.findUserById(chat.users.filter((u) => u.user !== user)[0].user);
            
            usersChats.push({
                "user": ouser,
                "chat_id": chat._id
            });
        }

        return usersChats;
    }

    async createNewChat(users: IRequestUser) {
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

    async listMessagesByChat(chat: String) {
        const messages = await this.Chat.findById(chat).select("messages");

        return messages;
    }

    async saveNewMessage(sentBy: String, chatId: String, message: String) {
        return await this.Chat.updateOne({ "_id": chatId }, {
            $push: {
                "messages": {
                    "message": message,
                    "sent_by": sentBy
                }
            }
        });
    }

    async listLastMessageByChat(chatId: String) {
        return await this.Chat.findOne({ "messages.date": now });
    }

    async listUsersFromChat(chatId: String, myUser: String) {
        let users = await this.Chat.findById(chatId).select("users");

        return users.users.filter((u) => u.user != myUser);
    }

    async checkIfChatAlreadyExists(me: String, other: String): Promise<Boolean> {
        const myChats = await this.Chat.find({ "users.user": me }).select("users");
        var exists = false;

        for await (let chat of myChats) {
            chat.users.map((user) => {
                if (user.user == other) {
                    exists = true;
                }
            });

            if (exists) {
                break;
            }
        }

        return exists;
    }
}

export { ChatRepository };