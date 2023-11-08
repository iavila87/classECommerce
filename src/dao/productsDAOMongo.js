import mongoose from "mongoose";
import productsModel from "./models/products.model.js";

export default class ProductsDAOMongo {

    constructor() {
        this.model = mongoose.model( productsModel.productsCollection, productsModel.productsSchema );
    }

    getAll = async ( filters, paginateOptions ) => {
        let products = await this.model.paginate( filters, paginateOptions );
        return products;
    }

    getById = async ( id ) => {
        let product = await this.model.find({_id:id});
        return product;
    }

    save = async ( product ) => {
        let result = await this.model.create(product);
        return result;
    }

    update = async ( id, product ) => {
        let result = await this.model.updateOne({_id:id}, product);
        return result;
    }

    delete = async ( id ) => {
        await this.model.deleteOne({_id:id});
        let products = this.model.find();
        return products;
    }

}