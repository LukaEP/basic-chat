import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { verify, VerifyErrors } from "jsonwebtoken";

class Authentication {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    auth = async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies.auth_token;
        const userId = !req.params.user ? req.body.user_me : req.params.user;

        if (!token) {
            res.status(401).send({ message: "Unauthorized" });
        }

        try {
            await verify(token, process.env.JWT_SECRET, async (err: VerifyErrors, decoded) => {
                const user = await this.userRepository.findUserById(userId);
                if (user.active_token != token) {
                    res.status(401).send({ message: "Unauthorized" });
                }
            });
            next();
        } catch(error) {
            res.status(401).send({ message: "Unauthorized" });
        }
    }
}

export { Authentication };