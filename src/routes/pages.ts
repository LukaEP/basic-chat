import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.render("html/user.html");
});

export { router };