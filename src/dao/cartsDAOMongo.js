import mongoose from "mongoose";
import cartsModel from "./models/carts.model.js";

export default class ProductsDAOMongo {

    constructor() {
        this.model = mongoose.model( cartsModel.cartsCollection, cartsModel.cartsSchema );
    }

    getById = async ( id ) => {
        let result = await this.model.findOne({_id:id});
        return result;
    }

    save = async () => {
        let result = await this.model.create({ products: [] });
        return result;
    }

    saveProduct = async (cid, cart) => {
        let result = await this.model.updateOne({_id:cid}, cart);
        return result;
    }

    delete = async (cid, cart) => {
        let result = await this.model.findByIdAndUpdate(cid, cart, {returnDocument: 'after'});
        return result;
    }

    update = async (cid, cart) => {
        let result = await this.model.findByIdAndUpdate(cid, cart, {returnDocument: 'after'});
        return result;
    }

    updateProduct = async (cid, cart) => {
        let result = await this.model.findByIdAndUpdate(cid, cart, {returnDocument: 'after'});
        return result;
    }

    deleteProducts = async (cid, cart) => {
        let result = await this.model.findByIdAndUpdate(cid, cart, {returnDocument: 'after'});
        return result;
    }
}