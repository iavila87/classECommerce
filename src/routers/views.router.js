import { Router } from "express";
import ProductManager from '../dao/ProductManager.js'
import productsModel from "../dao/models/products.model.js"

/** Inicializacion de ProductManager */
const pm = new ProductManager('./data/products.json');

const router = Router();

router.get('/', async (req, res) => {
    // consulta productos por fileSystem
    // const products = await pm.getProducts();
    
    // consulta productos por Mongoose
    
    const products = await productsModel.find().lean().exec();
    
    const emptyProducts = typeof products == 'string' || products.length == 0;

    res.render('home', { // como segundo argumento le paso argumentos como objetos
        emptyProducts,
        products
    });     // renderiza el home.handlebars en main.handlebars
});

router.get('/realtimeproducts', async (req, res) => {
    // consulta productos
    /** por filesystem */
    //const products = await pm.getProducts();
    const products = await productsModel.find().lean().exec();
    const emptyProducts = typeof products == 'string' || products.length == 0;

    res.render('realTimeProducts', { // como segundo argumento le paso argumentos como objetos
        emptyProducts,
        products
    });     // renderiza el home.handlebars en main.handlebars
});

// chat
router.get('/chat', async (req, res) => {
    // consulta productos
    /** por filesystem */
    //const products = await pm.getProducts();
    const products = await productsModel.find().lean().exec();
    const emptyProducts = typeof products == 'string' || products.length == 0;

    res.render('chat', { // como segundo argumento le paso argumentos como objetos
        emptyProducts,
        products
    });     // renderiza el home.handlebars en main.handlebars
});


export default router