import { io } from "../app";

io.on('connect', async (socket) => {
    socket.on("send_username", (params) => {
        console.log(params);
    });
});