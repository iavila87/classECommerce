export default class TicketsRepository{
    constructor(dao){
        this.dao = dao;
    }

    //getAll = async(filters, paginateOptions) => await this.dao.getAll(filters, paginateOptions)
    //getById = async(id) => await this.dao.getById(id)
    create = async(data) => await this.dao.save(data)
    //update = async(id, data) => await this.dao.update(id, data)
    //delete = async(id) => await this.dao.delete(id)
    

}