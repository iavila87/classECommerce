import PersistenceFactory from "../dao/products.PersistenceFactory.js";

export default class ProductsService {

    constructor () {
        //this.usersDAO = new UsersDAOMongo();
        this.productsDAO;
        this.init();
    }

    init = async () => {
        this.productsDAO = await PersistenceFactory.getPersistence();
    } 

    getProducts = async ( filters, paginateOptions ) => {

        return await this.productsDAO.getAll(filters, paginateOptions);
    }

    getProductById = async (id) => {

        return await this.productsDAO.getById(id);
    }

    addProduct = async (product) => {
        return await this.productsDAO.save(product);
    }

    updateProduct = async ( id, product ) => {
        return await this.productsDAO.update(id, product);
    }

    deleteProduct = async (id) => {
        return await this.productsDAO.delete(id);
    }
}