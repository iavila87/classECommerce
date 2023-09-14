import { Router } from "express";
import ProductManager from '../dao/ProductManager.js'

/** Inicializacion de ProductManager */
const pm = new ProductManager('./data/products.json');

const router = Router();

router.get('/', async (req, res) => {
    // consulta productos
    const products = await pm.getProducts();
    const emptyProducts = typeof products == 'string' || products.length == 0;

    res.render('home', { // como segundo argumento le paso argumentos como objetos
        emptyProducts,
        products
    });     // renderiza el home.handlebars en main.handlebars
});

router.get('/realtimeproducts', async (req, res) => {
    // consulta productos
    const products = await pm.getProducts();
    const emptyProducts = typeof products == 'string' || products.length == 0;

    res.render('realTimeProducts', { // como segundo argumento le paso argumentos como objetos
        emptyProducts,
        products
    });     // renderiza el home.handlebars en main.handlebars
});


export default router