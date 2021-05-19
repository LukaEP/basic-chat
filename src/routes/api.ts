import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { ChatController } from "../controllers/ChatController";

const router = Router();

const userController = new UserController();
const chatController = new ChatController();

router.post("/user/login", userController.login);
router.post("/user/create/user", userController.createNewUser);
router.post("/chat/list/chats", chatController.listChats);
router.post("/chat/new", chatController.newChat);

export { router };