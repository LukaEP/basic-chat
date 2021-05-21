import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { ChatController } from "../controllers/ChatController";
import { Authentication } from "../middlewares/Authentication";

const router = Router();

const userController = new UserController();
const chatController = new ChatController();
const authenticationMiddleware = new Authentication();

router.post("/user", userController.createNewUser);
router.post("/user/login", userController.login);
router.post("/user/logout", authenticationMiddleware.auth, userController.logout);
router.post("/chats", authenticationMiddleware.auth, chatController.newChat);
router.get("/chats/:user",  authenticationMiddleware.auth, chatController.listChats);

export { router };