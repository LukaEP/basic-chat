import { ChatRepository } from "../repositories/ChatRepository";
import { UserRepository } from "../repositories/UserRepository";
import { Request, Response } from "express";

class ChatController {
    private chatRepository: ChatRepository;
    private userRepository: UserRepository;

    constructor() {
        this.chatRepository = new ChatRepository();
        this.userRepository = new UserRepository();
    }

    listChats = async(req: Request, res: Response) => {
        const chats = await this.chatRepository.listChats(req.body.user_me);

        return res.status(200).send({ chats: chats });
    }

    newChat = async(req: Request, res: Response) => {
        const anotherUser = await this.userRepository.checkIfUserExistsByName(req.body.other_user);
        if (!anotherUser) {
            return res.status(400).send({ message: "User does not exists" });
        }

        await this.chatRepository.createNewChat({
            me: req.body.user_me,
            it: anotherUser._id
        });

        return res.status(201).send({ message: "Chat created" });
    }
}

export { ChatController };