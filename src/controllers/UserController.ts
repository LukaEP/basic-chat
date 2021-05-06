import { UserRepository } from "../repositories/UserRepository";

class UserController {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }
}

export { UserController };