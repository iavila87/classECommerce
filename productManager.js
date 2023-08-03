import fs from 'fs'

class ProductManager {

    #products;
    #path;

    constructor(path){
        this.#products = [];
        this.#path = path;
    }

    getPath(){
        return this.#path;
    }

    #generateID(){
        if(this.#products.length === 0) return 1;

        return this.#products[this.#products.length-1].id + 1;
    }

    #fileExists = () => {
        return fs.existsSync(this.#path);
    }


    getProducts(){
        return this.#products;
    }

    getProductById(id){
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

}

 
// Pruebas Realizadas
const pm = new ProductManager('./products.json');
console.log(pm.getProducts());
const prod = { title: "producto prueba",
               description: "Este es un producto prueba",
               price: 200,
               thumbnail: "Sin imagen",
               code: "abc123",
               stock: 25
             }
const prod1 = { title: "producto prueba",
                description: "Este es un producto prueba",
                price: 200,
                thumbnail: "Sin imagen",
                code: "abc124",
                stock: 25
              }
console.log(pm.addProduct(prod));
console.log(pm.addProduct(prod1));
/*console.log(pm.getProducts());
console.log(pm.addProduct(prod));
console.log(pm.getProductById(3));
*/

