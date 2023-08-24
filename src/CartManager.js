import fs from 'fs'
import ProductManager from './ProductManager.js';
/**
 * Cart : 
 * {
		"id": 1,
		"products": [ {product: 1 , quantity: 1}, {product: 2 , quantity: 4}"]
	}
 */

class CartManager {

    #carts;
    #path;
    #pm;

    constructor(path){
        this.#path = path;
        this.#fileInit();
        this.#pm = new ProductManager('./data/products.json');
    }

    async #fileInit(){
        if(!this.#fileExists()){
            await fs.promises.writeFile(this.#path, JSON.stringify([], null, '\t'));
        }
    }

    #fileExists = () => {
        return fs.existsSync(this.#path);
    }

    #generateID(){
        if(this.#carts.length === 0) return 1;

        return this.#carts[this.#carts.length-1].id + 1;
    }

    async createCart(){
        
        if(!this.#fileExists()) return 'Error - File error';
        let data = await fs.promises.readFile(this.#path, 'utf-8');
        this.#carts = JSON.parse(data);

        const newCart = {id: this.#generateID(), products: []};
        this.#carts.push(newCart);

        await fs.promises.writeFile(this.#path, JSON.stringify(this.#carts, null, '\t'));
        
        return newCart;
    }

    async getCartById(id){
        if(!this.#fileExists()) return 'Error - File error';
        let data = await fs.promises.readFile(this.#path, 'utf-8');
        this.#carts = JSON.parse(data);

        for (let i = 0; i < this.#carts.length; i++) {
            if(this.#carts[i].id === id) {
                return this.#carts[i];
            }
        }

        return 'Error - Not Found';
    }

    async addProductCartById(cid, pid){
        if(!this.#fileExists()) return 'Error - File error';
        let data = await fs.promises.readFile(this.#path, 'utf-8');
        this.#carts = JSON.parse(data);

        const cart = this.#carts.find(item => item.id === cid);
        if(!cart) {
            return 'Error - Cart Not Found';    
        }

        const product = await this.#pm.getProductById(parseInt(pid));
        
        if(typeof product == 'string') {
            return 'Error - Product Not Found';    
        }

        const addProduct = cart.products.find(item => item.product === pid);
        if(!addProduct){
            cart.products.push({ product: pid, quantity: 1 });
        }else{
            cart.products.forEach(pitem =>{
                if(pitem.product === pid){
                    pitem.quantity++;
                }
            });
        }

        this.#carts.forEach(item => {
            if(item.id === cart.id){
                item = cart;
            }             
        });
        
        await fs.promises.writeFile(this.#path, JSON.stringify(this.#carts, null, '\t')); 
        return cart;
    }



}

const test = async () => {
    const cm = new CartManager('./data/carts.json');
    console.log("create cart 1");
    console.log(await cm.createCart());
    console.log("get cart by Id");
    console.log(await cm.getCartById(3));
    console.log("add product 1");
    console.log(await cm.addProductCartById(2,9));
}

//test();

export default CartManager