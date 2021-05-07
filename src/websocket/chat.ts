import { io } from "../app";
import { UserRepository } from "../repositories/UserRepository";

io.on('connect', async (socket) => {
    const userRepository = new UserRepository();

    socket.on("send_username", async (params, callback) => {
        const user = await userRepository.checkIfUserExistsByName(params);

        if (user) {
            callback(user);
        } else {
            const newUser = await userRepository.createNewUser(params, socket.id);
            callback(newUser);
        }
    });
});