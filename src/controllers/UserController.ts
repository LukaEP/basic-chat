import { Request, Response } from "express";
import { sign as signToken } from "jsonwebtoken";
import { hash, compare } from "bcrypt";
import { UserRepository } from "../repositories/UserRepository";

class UserController {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    login = async (req: Request, res: Response) => {
        const user = await this.userRepository.checkIfUserExistsByName(req.body.name);

        if (user && await this.decrypt(req.body.password, user.password)) {
            const token = signToken({ id: user.id }, process.env.JWT_SECRET);

            await this.userRepository.updateUserToken(user.id, token);

            res.cookie("auth_token", token);

            return res.status(200).send({ user: user.id, token: token });
        } else {
            return res.status(400).send({ message: "Invalid arguments" });
        }
    }

    createNewUser = async (req: Request, res: Response) => {
        const newUser = await this.userRepository.createNewUser(req.body.name, await this.ecrypt(req.body.password));
        const token = signToken({ id: newUser.id }, process.env.JWT_SECRET);

        await this.userRepository.updateUserToken(newUser.id, token);

        res.cookie("auth_token", token);

        return res.status(200).send({ user: newUser.id, token: token });
    }

    private ecrypt = async (password: string): Promise<string> => {
        return await hash(password, 10).then((hash) => {
            return hash;
        });
    }

    private decrypt = async (decryptedPassword: string, encryptedPassword: string): Promise<Boolean> => {
        return await compare(decryptedPassword, encryptedPassword).then((result) => {
            return result;
        });
    }

    logout = async (req: Request, res: Response) => {
        res.clearCookie("auth_token", { path: "/" });

        await this.userRepository.updateUserToken(req.body.user_me, null);

        return res.status(204);
    }
}

export { UserController };