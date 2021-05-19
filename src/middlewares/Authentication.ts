import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

class Authentication {
    async auth(req: Request, res: Response, next: NextFunction) {
        let token = req.cookies.auth_token;

        if (!token) {
            res.status(401).send({ message: "Unauthorized" });
        }

        try {
            verify(token, process.env.JWT_SECRET);
            next();
        } catch(error) {
            res.status(401).send({ message: "Unauthorized" });
        }
    }
}

export { Authentication };