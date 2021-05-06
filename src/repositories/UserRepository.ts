import { Model, model, Document } from "mongoose";

interface IUser extends Document {
    name: String,
    socket_id: String
}

class UserRepository {
    private User: Model<IUser>;

    constructor() {
        this.User = model("users");
    }
}

export { UserRepository };