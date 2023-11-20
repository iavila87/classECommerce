export default class UsersRepository{
    constructor(dao){
        this.dao = dao;
    }
    
    getById = async(id) => {
        console.log("id: "+id);
        return await this.dao.getById(id)
    }

    get = async(email) => {
        console.log("email: "+email);
        return await this.dao.get(email)
    }
    create = async(data) => await this.dao.save(data)
}