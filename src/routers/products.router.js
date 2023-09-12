import { Router } from "express";
import ProductManager from '../ProductManager.js'
import { productsModel } from "../models/products.model.js"; 

/** Inicializacion de ProductManager */
const pm = new ProductManager('./data/products.json');

const router = Router();

/** Metodos GET */
/** get 'api/products' y 'api/products?limit='*/
router.get('/', async (req, res) =>{

    const limit = req.query.limit;
    /** Acceso por archivo
        const products = await pm.getProducts();
    */
    /** Acceso por Mongoose */
    try{
        const products = await productsModel.find();

        if(typeof products == 'string') {
            return res.status(404).send( { status: "error", error: products.split(' ').slice(2).join(' ') } );
        }
    
        if(!limit) {
            return res.status(200).send( {status: "success", payload: products } );
        }
    
        res.status(200).send( {status: "success", payload: products.slice(0,limit) } );
    }
    catch(error){
        console.log("error de mongoose: "+error);
    }
    
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
    /** por archivo */
    //const newProduct = await pm.addProduct(req.body);
    /** por mongoose */
    const newProduct = await productsModel.create(req.body);

    if(typeof newProduct == 'string'){
        return res.status(404).send( { status: "error", error: newProduct.split(' ').slice(2).join(' ') } );
    }
    newProduct.status = true;
    res.status(201).send( { status: "success", payload: newProduct } );
});

/** Metodo PUT */
router.put('/:pid', async (req, res) =>{

    const id = parseInt(req.params.pid);
    /** por archivo */
    //const product = await pm.updateProduct(id, req.body);
    /** por mongoose */
    const product = await productsModel.updateOne({_id:req.params.pid}, req.body);

    if(typeof product == 'string'){
        return res.status(404).send( { status: "error", error: product.split(' ').slice(2).join(' ') } );
    }
    res.status(200).send( { status: "success", payload: product } );
});

/** Metodo DELETE */
router.delete('/:pid', async (req, res) =>{

    const id = parseInt(req.params.pid);
    /** por archivo */
    //const products = await pm.deleteProduct(id);
    /** por mongoose */
    const products = await productsModel.deleteOne({_id:req.params.pid});

    if(typeof products == 'string'){
        return res.status(404).send( { status: "error", error: products.split(' ').slice(2).join(' ') } );
    }
    res.status(200).send( { status: "success", payload: products } );
});

export default router;