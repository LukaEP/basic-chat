# Basic Chat

## Introduction

This is a basic chat built in NodeJS using Typescript, with Express as framework. The database used was MongoDB, for its simplicity and velocity. And to handle the communication, between server and client side, Socket.io was choosen.

## Instalation

First of all, install the dependencies:
```bash
npm install
```
After this, copy the ".env.example" to ".env":
```bash
cp .env.example .env
```
Inside the ".env" file, put your MongoDB url in the MONGO_URL variable:
```txt
MONGO_URL=<your_mongodb_url>
```
> I used the [MongoDB Cloud](https://www.mongodb.com/1). It's very simple to use, if you don't know how I recommend going to the [documentation](https://docs.atlas.mongodb.com/getting-started/).

To start the application run "npm run dev":
```bash
npm run dev

> basic-chat@1.0.0 dev
> tsnd src/server.ts

[INFO] 09:00:01 ts-node-dev ver. 1.1.6 (using ts-node ver. 9.1.1, typescript ver. 4.2.4)
Server up on port 3033!
MongoDB Connected
```

## Usage

After starting the application go to http://localhost:3033/pages. This is the main page, where you get to choose a username to chat with other people. There is no authentication, yet, so you can choose a random username and start chatting.

![alt text](./docs/images/mainpage-chat.png)

After clicking on "Go" button, it will redirect you to the chats of that user.

![alt text](./docs/images/chatspage-chat.png)

To start a new chat, just type the username of another user in the "Start Chat" field, and click on "Call" button. It will show the chat with the username of the user you're chatting with.

![alt text](./docs/images/newchat-chat.png)

To start chatting is just click on the chat, the page will reload and open the messages with a text field, to send new messages.

![alt text](./docs/images/chatting-chat.png)

## Credits

This project was based on another code from an event ([NLW#5](https://rseat.in/nlw5)). Unfortunately, this event isn't available anymore. But the original code is still available on GitHub.

[Link](https://github.com/EliasGcf/nlw-05-nodejs) to the original code.

## License
This project is [MIT licensed](LICENSE.txt).