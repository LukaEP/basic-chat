import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.render("html/user.html");
});

router.get("/user/:user", (req, res) => {
    res.render("html/chat.html");
});

export { router };