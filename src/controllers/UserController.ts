import { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository";

class UserController {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    checkUsername = async (req: Request, res: Response) => {
        const user = await this.userRepository.checkIfUserExistsByName(req.body.name);

        if (user) {
            return res.status(200).send({ user: user });
        } else {
            const newUser = await this.userRepository.createNewUser(req.body.name, req.body.socket_id);
            return res.status(200).send({ user: newUser });
        }
    }
}

export { UserController };