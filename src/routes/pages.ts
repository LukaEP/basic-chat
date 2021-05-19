import { Router } from "express";
import { Authentication } from "../middlewares/Authentication";

const router = Router();

const authenticationMiddleware = new Authentication();

router.get("/", (req, res) => {
    res.render("html/user.html");
});

router.get("/user/:user/:chat_id?", authenticationMiddleware.auth, (req, res) => {
    res.render("html/chat.html");
});

export { router };