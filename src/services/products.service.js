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

    getProducts = async () => {

        return await this.productsDAO.getAll();
    }

    getProductById = async (id) => {

        return await this.productsDAO.getById(id);
    }

    /*addUser = async (product) => {
        return await this.productsDAO.save(product);
    }*/
}