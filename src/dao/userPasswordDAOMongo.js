import mongoose from "mongoose";
import userPasswordModel from "./models/user.password.model.js";

export default class UserPasswordDAOMongo {

    constructor() {
        this.model = mongoose.model( userPasswordModel.userPasswordCollection, userPasswordModel.userPasswordSchema );
    }
/*
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
*/
    save = async (userToken) => {
        const result = await this.model.create(userToken);
        return result;
    }

}