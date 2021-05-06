import { config as dotenv } from "dotenv";
dotenv();

import express from "express";
const app = express();

import "./database";
import "./database/models/User";
import "./database/models/Chat";

import path from "path";

app.use(express.static(path.join(__dirname, '..', 'public')));
app.set('views', path.join(__dirname, '..', 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

import { router as routesapi  } from "./routes/api";
import { router as routespage } from "./routes/pages";

app.use(express.json());
app.use("/api", routesapi);
app.use("/pages", routespage);

import { createServer } from "http";
import { Server } from "socket.io";

const http = createServer(app);
const io = new Server(http);

export { http, io };