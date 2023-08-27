import { Router } from "express";
import ProductManager from '../ProductManager.js'

/** Inicializacion de ProductManager */
const pm = new ProductManager('./data/products.json');

const router = Router();

router.get('/', async (req, res) => {
    // consulta productos
    const products = await pm.getProducts();
    let emptyProducts = false;
    if(typeof products == 'string' || products.length == 0) {
        emptyProducts = true;
    }

    res.render('home', { // como segundo argumento le paso argumentos como objetos
        emptyProducts,
        products: products
    });     // renderiza el home.handlebars en main.handlebars
});

router.get('/realtimeproducts', async (req, res) => {
    
    res.render('realTimeProducts', { // como segundo argumento le paso argumentos como objetos
    });     // renderiza el home.handlebars en main.handlebars
});


export default router