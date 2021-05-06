import express from "express";
import { config as dotenv } from "dotenv";
import { router } from "./routes";

dotenv();

import "./database";
import "./database/models/User";
import "./database/models/Chat";

const app = express();

app.use("/", router);

export { app };