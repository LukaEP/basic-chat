import { Model, model, Document } from "mongoose";

interface IUser extends Document {
    name: String,
    password: string,
    socket_id: String,
    active_token?: String
}

class UserRepository {
    private User: Model<IUser>;

    constructor() {
        this.User = model("users");
    }

    async checkIfUserExistsByName(name: String): Promise<IUser | null> {
        return await this.User.findOne({ name: name });
    }

    async createNewUser(name: String, password: String) {
        const newUser = new this.User({
            name: name,
            password: password
        });

        await newUser.save();

        return newUser;
    }

    async findUserById(id: String): Promise<IUser> {
        return await this.User.findById(id);
    }

    async updateUserToken(id: String, token: String): Promise<IUser> {
        return await this.User.findByIdAndUpdate({ _id: id }, { active_token: token });
    }
}

export { UserRepository };