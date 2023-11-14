export default class CartsRepository{
    constructor(dao){
        this.dao = dao;
    }

    getById = async(id) => await this.dao.getById(id)
    create = async() => await this.dao.save()
    addProduct = async(id,data) => await this.dao.addProductToCart(id,data)
    update = async(id, data) => await this.dao.update(id, data)
}