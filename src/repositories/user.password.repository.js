export default class UserPasswordRepository{
    constructor(dao){
        this.dao = dao;
    }
    /*
    getById = async(id) => {
        return await this.dao.getById(id)
    }
*/
    getByToken = async(token) => {
        return await this.dao.getByToken(token);
    }

    save = async(data) => await this.dao.save(data);

    delete = async(email) => {
        await this.dao.delete(email);
    }
}