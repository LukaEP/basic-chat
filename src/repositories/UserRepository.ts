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

    async checkIfUserExistsByName(name: String): Promise<IUser | null> {
        return await this.User.findOne({ name: name });
    }

    async createNewUser(user: IUser) {
        const newUser = new this.User({
            name: user.name,
            socket_id: user.socket_id
        });

        await newUser.save();

        return newUser;
    }
}

export { UserRepository };