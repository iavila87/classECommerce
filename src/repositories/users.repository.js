export default class UsersRepository{
    constructor(dao){
        this.dao = dao;
    }
    
    getById = async(id) => {
        return await this.dao.getById(id);
    }

    get = async(email) => {
        return await this.dao.get(email);
    }
    create = async(data) => await this.dao.save(data);

    update = async (user, password) => {
        return await this.dao.update(user, password);
    }
}