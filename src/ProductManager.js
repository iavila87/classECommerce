import fs from 'fs'
 
class ProductManager {

    #products;
    #path;

    constructor(path){
        this.#path = path;
        this.#fileInit();
    }

    getPath(){
        return this.#path;
    }

    #generateID(){
        if(this.#products.length === 0) return 1;

        return this.#products[this.#products.length-1].id + 1;
    }

    async #fileInit(){
        if(!this.#fileExists()){
            await fs.promises.writeFile(this.#path, JSON.stringify([], null, '\t'));
        }
    }

    #fileExists = () => {
        return fs.existsSync(this.#path);
    }


    async getProducts(){
        if(!this.#fileExists()) return 'Error - File error';
        let data = await fs.promises.readFile(this.#path, 'utf-8');
        this.#products = JSON.parse(data);
        return this.#products;
    }

    async getProductById(id){
        if(!this.#fileExists()) return 'Error - File error';
        let data = await fs.promises.readFile(this.#path, 'utf-8');
        this.#products = JSON.parse(data);

        for (let i = 0; i < this.#products.length; i++) {
            if(this.#products[i].id === id) {
                return this.#products[i];
            }
        }

        return 'Error - Not Found';
    }

    async addProduct(product){
        
        let isNull = !product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock;
        if(isNull) return 'Error - Data error';
        
        if(!this.#fileExists()) return 'Error - File error';
        let data = await fs.promises.readFile(this.#path, 'utf-8');
        this.#products = JSON.parse(data);

        let isCode = this.#products.find(elem => elem.code === product.code);
        if(isCode) return 'Error - Code is repeat';

        const newProduct = {id: this.#generateID(), ...product};
        this.#products.push(newProduct);

        await fs.promises.writeFile(this.#path, JSON.stringify(this.#products, null, '\t'));
        
        return newProduct;
    }

    async updateProduct(id, pUpdate){
        if(!this.#fileExists()) return 'Error - File error';
        let data = await fs.promises.readFile(this.#path, 'utf-8');
        this.#products = JSON.parse(data);
        
        for(let i = 0; i < this.#products.length; i++){
            if(this.#products[i].id === id){
                this.#products[i] = {...this.#products[i], ...pUpdate};
                await fs.promises.writeFile(this.#path, JSON.stringify(this.#products, null, '\t')); 
                return this.#products[i];
            }
        }

        return 'Error - Product does not exists';
    }

    async deleteProduct(id){
        if(!this.#fileExists()) return 'Error - File error';
        let data = await fs.promises.readFile(this.#path, 'utf-8');
        this.#products = JSON.parse(data);

        let newProducts = this.#products.filter(elem => elem.id !== id);
        
        if(newProducts.length < this.#products.length){
            await fs.promises.writeFile(this.#path, JSON.stringify(newProducts, null, '\t'));
            return newProducts;
        }

        return 'Error - Product does not exists';
    }


}

 


// Pruebas Realizadas
const pruebas = async ()=>{
    const pm = new ProductManager('./products.json');
    console.log("Comenzando Test");
    console.log("getProducts:");
    console.log(await pm.getProducts());
    const prod = { title: "producto prueba",
                description: "Este es un producto prueba",
                price: 200,
                thumbnail: "Sin imagen",
                code: "abc123",
                stock: 25
                };
    const prod1 = { title: "producto prueba",
                    description: "Este es un producto prueba",
                    price: 200,
                    thumbnail: "Sin imagen",
                    code: "abc124",
                    stock: 25
                };
    console.log("addProduct:1");
    console.log(await pm.addProduct(prod));
    console.log("addProduct:2");
    console.log(await pm.addProduct(prod1));
    console.log("getProducts:");
    console.log(await pm.getProducts());
    console.log("getProductById(1):");
    console.log(await pm.getProductById(1));
    console.log("getProductById(2):");
    console.log(await pm.getProductById(2));
    console.log("updateProduct(1):");
    console.log(await pm.updateProduct(2,{price:250}));
    console.log("getProductById(1):");
    console.log(await pm.getProductById(1));
    console.log("deleteProduct(1):");
    console.log(await pm.deleteProduct(1));
    console.log("deleteProduct(1):");
    console.log(await pm.deleteProduct(1));
}

export default ProductManager

pruebas();
