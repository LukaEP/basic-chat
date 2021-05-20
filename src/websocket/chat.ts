import { io } from "../app";
import { ChatRepository } from "../repositories/ChatRepository";

io.on('connect', async (socket) => {
    const chatRepository = new ChatRepository();

    socket.on("call_messages", async (params) => {
        socket.join(params.chat);
        socket.emit("receive_messages", await chatRepository.listMessagesByChat(params.chat));
    });

    socket.on('send_message', async (params) => {
        await chatRepository.saveNewMessage(params.sent_by, params.chat_id, params.message);
        io.sockets.in(params.chat_id).emit("receive_messages", await chatRepository.listMessagesByChat(params.chat_id));
    });
});