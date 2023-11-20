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
        console.log("iddao: "+id);
        const result = await this.model.findOne({_id:id});
        console.log("traje user by id: "+ JSON.stringify(result));
        return result;
    }

    get = async (email) => {
        console.log("emaildao: "+email);
        const result = await this.model.findOne({ email: email });
        console.log("traje user: "+ JSON.stringify(result));
        return result;
    }

    save = async (user) => {
        const result = await this.model.create(user);
        console.log("agregue user: "+ JSON.stringify(result) );
        return result;
    }

}