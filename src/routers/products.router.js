import { Router } from "express";
import ProductManager from '../dao/ProductManager.js'
import productsModel from "../dao/models/products.model.js" 

/** Inicializacion de ProductManager */
const pm = new ProductManager('./data/products.json');

const router = Router();

/** Metodos GET */
/** get 'api/products' y 'api/products?limit='*/
router.get('/', async (req, res) =>{

    const limit = parseInt(req.query.limit);
    /** Acceso por archivo
        const products = await pm.getProducts();
    */
    /** Acceso por Mongoose */
    try{
        if(limit) {
            const products = await productsModel.find().limit(limit);
            return res.status(200).send( {status: "success", payload: products } );
        }

        const products = await productsModel.find();
        /* 
        if(typeof products == 'string') {
            return res.status(404).send( { status: "error", error: products.split(' ').slice(2).join(' ') } );
        }*/
        res.status(200).send( {status: "success", payload: products } );
    }
    catch(error){
        console.log("error de mongoose: "+error);
    }
});

/** get 'api/products/:pid' */
router.get('/:pid', async (req, res) =>{

    const id = req.params.pid;
    /** por filesystem */
    //const product = await pm.getProductById(id);
    try{
        /** por mongoose */
        const product = await productsModel.find({_id:id});
        /*if(typeof product == 'string'){
            res.status(404).send( { status: "error", error: product.split(' ').slice(2).join(' ') } );
        }*/
        return res.status(200).send( { status: "success", payload: product } );
    }catch(error){
        console.log("error: "+ error )
    }
});

/** Metodo POST */
router.post('/', async (req, res) => {
    /** por archivo */
    //const newProduct = await pm.addProduct(req.body);
    /** por mongoose */
    try{
        const newProduct = req.body;
        newProduct.status = true;
        const generatedProduct = new productsModel(newProduct);
        await generatedProduct.save();
        // res.redirect('/'); redirecciona a la vista raiz
        /*if(typeof newProduct == 'string'){
            return res.status(404).send( { status: "error", error: newProduct.split(' ').slice(2).join(' ') } );
        }*/
        res.status(201).send( { status: "success", payload: generatedProduct } );
    }catch(error){
        console.log("error: " + error);
    }
});

/** Metodo PUT */
router.put('/:pid', async (req, res) =>{

    const id = req.params.pid;
    const updateProduct = req.body;
    /** por archivo */
    //const product = await pm.updateProduct(id, req.body);
    /** por mongoose */
    try{
        const product = await productsModel.updateOne({_id:id}, updateProduct);
        /*
        if(typeof product == 'string'){
            return res.status(404).send( { status: "error", error: product.split(' ').slice(2).join(' ') } );
        }*/
        res.status(200).send( { status: "success", payload: product } );

    }catch(error){
        console.log("error: "+error);
    }
});

/** Metodo DELETE */
router.delete('/:pid', async (req, res) =>{

    const id = req.params.pid;
    /** por archivo */
    //const products = await pm.deleteProduct(id);
    /** por mongoose */
    try{
        const deleteProduct = await productsModel.deleteOne({_id:id});
        const products = productsModel.find();
        /*
        if(typeof products == 'string'){
            return res.status(404).send( { status: "error", error: products.split(' ').slice(2).join(' ') } );
        }*/
        res.status(200).send( { status: "success", payload: products } );
    }catch(error){
        console.log("error: "+error);
    }
});

export default router;