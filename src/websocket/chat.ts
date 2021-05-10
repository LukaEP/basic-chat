import { io } from "../app";
import { UserRepository } from "../repositories/UserRepository";
import { ChatRepository } from "../repositories/ChatRepository";

io.on('connect', async (socket) => {
    const userRepository = new UserRepository();
    const chatRepository = new ChatRepository();

    socket.on("send_username", async (params, callback) => {
        const user = await userRepository.checkIfUserExistsByName(params);

        if (user) {
            callback(user);
        } else {
            const newUser = await userRepository.createNewUser(params, socket.id);
            callback(newUser);
        }
    });

    socket.on("receive_messages", async (params, callback) => {
        callback(await chatRepository.listMessagesByChat(params));
    });

    socket.on('send_message', async (params) => {
        await chatRepository.saveNewMessage(params.sent_by, params.chat_id, params.message);
    });
});