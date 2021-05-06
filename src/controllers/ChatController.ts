import { ChatRepository } from "../repositories/ChatRepository";

class ChatController {
    private chatRepository: ChatRepository;

    constructor() {
        this.chatRepository = new ChatRepository();
    }
}

export { ChatController };