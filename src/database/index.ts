import { connect, connection } from "mongoose";

connect(`${process.env.MONGO_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connection.on("open", () => {
    console.log("MongoDB Connected");
});

connection.on(`${process.env.MONGO_URL}`, (error) => {
    console.log(error);
});

const conn = connection;

export { conn };