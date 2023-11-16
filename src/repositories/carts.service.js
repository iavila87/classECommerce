import PersistenceFactory from "../dao/carts.PersistenceFactory.js";

export default class CartsService {

    constructor () {
        //this.usersDAO = new UsersDAOMongo();
        this.cartsDAO;
        this.init();
    }

    init = async () => {
        this.cartsDAO = await PersistenceFactory.getPersistence();
    } 

    getCartById = async (id) => {
        return await this.cartsDAO.getById(id);
    }

    addCart = async () => {
        return await this.cartsDAO.save();
    }

    addProductToCart = async ( id, cart ) => {
        return await this.cartsDAO.saveProduct(id, cart);
    }

    updateCart = async (id, cart) => {
        return await this.cartsDAO.update(id, cart);
    }
}