import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { ChatController } from "../controllers/ChatController";

const router = Router();

const userController = new UserController();
const chatController = new ChatController();

router.post("/user/check/username", userController.checkUsername);
router.post("/chat/list/messages", chatController.listMessages);
router.post("/chat/new", chatController.newChat);

export { router };