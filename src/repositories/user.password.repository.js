export default class UserPasswordRepository{
    constructor(dao){
        this.dao = dao;
    }
    /*
    getById = async(id) => {
        return await this.dao.getById(id)
    }

    get = async(email) => {
        return await this.dao.get(email)
    }*/

    save = async(data) => await this.dao.save(data)
}