export default class UsersRepository{
    constructor(dao){
        this.dao = dao;
    }
    
    getById = async(id) => {
        return await this.dao.getById(id);
    }

    getByIdView = async(id) => {
        return await this.dao.getByIdView(id);
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

    updateRole = async (user, role) => {
        return await this.dao.updateRole(user, role);
    }

    updateLastConn = async (email) => {
        return await this.dao.updateLastConn(email);
    }

    delete = async (id) => {
        return await this.dao.delete(id);
    }
}