import mongoose from "mongoose";
import usersModel from "./models/users.model.js";

export default class UsersDAOMongo {

    constructor() {
        this.model = mongoose.model( usersModel.usersCollection, usersModel.usersSchema );
    }

    getAll = async () => {
        results = await this.model.find();
        return results;
    }

    save = async (user) => {
        let result = await this.model.create(user);
        return result;
    }

}