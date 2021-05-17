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
> I used the MongoDB Cloud (https://www.mongodb.com/1). It's very simple to use, if you don't know how I recommend going to the documentation (https://docs.atlas.mongodb.com/getting-started/).

## Usage

It's very simple, basically you choose a username (there is no authentication). and you are redirected to this user's chats. On the chats page, you can "call" another user and it will open a new chat, between the two users.

## License
This project is [MIT licensed](LICENSE.txt).