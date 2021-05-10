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

    async createNewUser(name: String, socket_id: String) {
        const newUser = new this.User({
            name: name,
            socket_id: socket_id
        });

        await newUser.save();

        return newUser;
    }

    async findUserById(id: String): Promise<IUser> {
        return await this.User.findById(id);
    }
}

export { UserRepository };