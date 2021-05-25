import { Router } from "express";
import { Authentication } from "../middlewares/Authentication";

const router = Router();

const authenticationMiddleware = new Authentication();

router.get("/", (req, res) => {
    return res.render("html/user.html");
});

router.get("/user/:user/:chat_id?", authenticationMiddleware.auth, (req, res) => {
    return res.render("html/chat.html");
});

export { router };