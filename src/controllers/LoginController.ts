import { sign as signToken } from "jsonwebtoken";
import { Request, Response } from "express";

class LoginController {
    async login(req: Request, res: Response) {

    }

    private async ecrypt(): Promise<String> {
        return "";
    }

    private async decrypt(): Promise<String> {
        return "";
    }
}

export { LoginController };