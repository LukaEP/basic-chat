import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { ChatController } from "../controllers/ChatController";
import { Authentication } from "../middlewares/Authentication";

const router = Router();

const userController = new UserController();
const chatController = new ChatController();
const authenticationMiddleware = new Authentication();

router.post("/user/login", userController.login);
router.post("/user/create/user", userController.createNewUser);
router.post("/chat/list/chats",  authenticationMiddleware.auth, chatController.listChats);
router.post("/chat/new", authenticationMiddleware.auth, chatController.newChat);

export { router };