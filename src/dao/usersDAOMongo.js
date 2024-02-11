import mongoose from "mongoose";
import usersModel from "./models/users.model.js";
import { JWT_PRIVATE_KEY, createHash, extractCookie, generateToken, isValidPassword } from "../utils.js";

export default class UsersDAOMongo {

    constructor() {
        this.model = mongoose.model( usersModel.usersCollection, usersModel.usersSchema );
    }

    getAll = async () => {
        const results = await this.model.find();
        return results;
    }
    
    getById = async (id) => {
        const result = await this.model.findOne({_id:id});
        return result;
    }

    getByIdView = async (id) => {
        const result = await this.model.findOne({_id:id}).populate('cart').lean().exec();
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

    update = async (user, password) => {
        const result = await this.model.findByIdAndUpdate(user._id, { password: createHash(password) });
        return result;
    }

    updateRole = async (user, role) => {
        const result = await this.model.findOneAndUpdate({ email:user }, { role: role });
        return result;
    }

    updateLastConn = async (email) => {
        const result = await this.model.findOneAndUpdate({ email:email }, { last_connection: Date.now() });
        return result;
    }

    delete = async (id) => {
        const result = await this.model.deleteOne({_id:id});
        return result;
    }

}