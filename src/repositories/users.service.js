//import UsersDAOMongo from "../dao/usersDAOMongo.js";
import PersistenceFactory from "../dao/users.PersistenceFactory.js";

export default class UsersService {

    constructor () {
        //this.usersDAO = new UsersDAOMongo();
        this.usersDAO;
        this.init();
    }

    init = async () => {
        this.usersDAO = await PersistenceFactory.getPersistence();
    } 

    getUsers = async () => {

        return await this.usersDAO.getAll();
    }

    addUser = async (user) => {
        return await this.usersDAO.save(user);
    }
}