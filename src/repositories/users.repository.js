export default class UsersRepository{
    constructor(dao){
        this.dao = dao;
    }
    
    getById = async(id) => {
        return await this.dao.getById(id);
    }

    getAll = async() => {
        return await this.dao.getAll();
    }

    get = async(email) => {
        return await this.dao.get(email);
    }
    create = async(data) => await this.dao.save(data);

    update = async (user, password) => {
        return await this.dao.update(user, password);
    }

    delete = async (id) => {
        return await this.dao.delete(id);
    }
}