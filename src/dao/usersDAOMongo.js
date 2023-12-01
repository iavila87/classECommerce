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
    
    getById = async (id) => {
        const result = await this.model.findOne({_id:id});
        return result;
    }

    get = async (email) => {
        const result = await this.model.findOne({ email: email });
        return result;
    }

    save = async (user) => {
        const result = await this.model.create(user);
        return result;
    }

}