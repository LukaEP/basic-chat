import express from "express";
import { config as dotenv } from "dotenv";
import { router } from "./routes";

dotenv();

import "./database";

const app = express();

app.use("/", router);

export { app };