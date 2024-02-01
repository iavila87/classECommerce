import PersistenceFactory from "../dao/user.password.PersistenceFactory.js";

export default class UserPasswordService {

    constructor () {
        this.userPasswordDAO;
        this.init();
    }

    init = async () => {
        this.userPasswordDAO = await PersistenceFactory.getPersistence();
    } 

    save = async (userToken) => {
        return await this.userPasswordDAO.save(userToken);
    }
    /*
    getUsers = async () => {

        return await this.usersDAO.getAll();
    }

    addUser = async (user) => {
        return await this.usersDAO.save(user);
    }
    */

}