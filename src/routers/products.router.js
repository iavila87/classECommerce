import { Router } from "express";
import ProductManager from '../ProductManager.js'

/** Inicializacion de ProductManager */
const pm = new ProductManager('./data/products.json');

const router = Router();

/** Metodos GET */
/** get 'api/products' y 'api/products?limit='*/
router.get('/', async (req, res) =>{

    const limit = req.query.limit;
    const products = await pm.getProducts();

    if(typeof products == 'string') {
        return res.status(404).send( { status: "error", error: products.split(' ').slice(2).join(' ') } );
    }

    if(!limit) {
        return res.status(200).send( {status: "success", payload: products } );
    }

    res.status(200).send( {status: "success", payload: products.slice(0,limit) } );
});

/** get 'api/products/:pid' */
router.get('/:pid', async (req, res) =>{

    const id = parseInt(req.params.pid);
    const product = await pm.getProductById(id);

    if(typeof product !== 'string'){
        return res.status(200).send( { status: "success", payload: product } );
    }

    res.status(404).send( { status: "error", error: product.split(' ').slice(2).join(' ') } );
});

/** Metodo POST */
router.post('/', async (req, res) => {
    
    const newProduct = await pm.addProduct(req.body);
    
    if(typeof newProduct == 'string'){
        return res.status(404).send( { status: "error", error: newProduct.split(' ').slice(2).join(' ') } );
    }
    newProduct.status = true;
    res.status(201).send( { status: "success", payload: newProduct } );
});

/** Metodo PUT */
router.put('/:pid', async (req, res) =>{

    const id = parseInt(req.params.pid);
    const product = await pm.updateProduct(id, req.body);

    if(typeof product == 'string'){
        return res.status(404).send( { status: "error", error: product.split(' ').slice(2).join(' ') } );
    }
    res.status(200).send( { status: "success", payload: product } );
});

/** Metodo DELETE */
router.delete('/:pid', async (req, res) =>{

    const id = parseInt(req.params.pid);
    const products = await pm.deleteProduct(id);

    if(typeof products == 'string'){
        return res.status(404).send( { status: "error", error: products.split(' ').slice(2).join(' ') } );
    }
    res.status(200).send( { status: "success", payload: products } );
});

export default router;