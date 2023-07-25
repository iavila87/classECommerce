class ProductManager {

    #products;

    constructor(){
        this.#products = [];
    }

    #generateID(){
        if(this.#products.length === 0) return 1;

        return this.#products[this.#products.length-1].id + 1;
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

    addProduct(product){
        let isCode = this.#products.find(elem => elem.code === product.code);
        let isNull = !product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock;
        
        if(isNull) return 'Error - Data error';

        if(isCode) return 'Error - Code is repeat';

        const newProduct = {id: this.#generateID(), ...product};
        this.#products.push(newProduct);
        
        return newProduct;
    }

}

/* 
// Pruebas Realizadas
const pm = new ProductManager();
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
console.log(pm.getProducts());
console.log(pm.addProduct(prod));
console.log(pm.getProductById(3));
*/

