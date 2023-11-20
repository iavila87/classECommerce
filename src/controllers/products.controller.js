import productsModel from "../dao/models/products.model.js";
//import ProductsService from "../services/products.service.js";

import { ProductsService } from '../repositories/index.js'

//const productsService = new ProductsService();

export const getAllProductsController = async (req, res) => {

    /* const limit contiene el valor del queryparam(limit)
    en caso de que este no exista por defecto se le asigna 10 */
    const limit = req.query.limit || 10;
    /* const page contiene el valor del queryparam(page)
    en caso de que este no exista por defecto se le asigna 1 */
    const page = req.query.page || 1;
    const filters = {};
    if(req.query.category)  filters.category = req.query.category;
    if(req.query.stock)     filters.stock = req.query.stock;
    /** paginacion */
    const paginateOptions = { lean:true, limit, page };
    if(req.query.sort === 'asc') paginateOptions.sort = {price : 1};
    if(req.query.sort === 'desc') paginateOptions.sort = {price : -1};

    try{
        console.log("LLEgue al paginate");
        const products = await ProductsService.getAll(filters, paginateOptions)
        console.log("products PAginate: " + JSON.stringify(products));
        //const products = productsService.getProducts( filters, paginateOptions );
        //const products = await productsModel.paginate( filters, paginateOptions );
        
        let prevLink;
        if(!req.query.page){
            prevLink = `http://${req.hostname}:8080${req.originalUrl}&page=${products.prevPage}`;
        }else{
            const urlMod = req.originalUrl.replace(`page=${req.query.page}`,`page=${products.prevPage}`);
            prevLink = `http://${req.hostname}:8080${urlMod}`;
        }

        let nextLink;
        if(!req.query.page){
            nextLink = `http://${req.hostname}:8080${req.originalUrl}&page=${products.nextPage}`;
        }else{
            const urlMod = req.originalUrl.replace(`page=${req.query.page}`,`page=${products.nextPage}`);
            nextLink = `http://${req.hostname}:8080${urlMod}`;
        }
    
        return res.status(200).send( { 
            status:'success',
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.prevLink ? prevLink : null,
            nextLink: products.nextLink ? nextLink : null
        });
    }
    catch(error){
        console.log("error: " + error);
        return res.status(500).send( { status: "error", error: error.message } );
    }
}

export const getProductByIdController = async (req, res) =>{

    const id = req.params.pid;
    
    try{
        const product = await ProductsService.getById(id);
        //const product = productsService.getProductById( id );
        //const product = await productsModel.find({_id:id});
        return res.status(200).send( { status: "success", payload: product } );
    }catch(error){
        res.status(404).send( { status: "error", error: error.message } );
    }
}

export const createProductController = async (req, res) => {

    try{
        const newProduct = req.body;
        newProduct.status = true;

        const generatedProduct = await ProductsService.create(newProduct);
        //const generatedProduct = productsService.addProduct(newProduct);
        //const generatedProduct = new productsModel(newProduct);
        //await generatedProduct.save();
        // res.redirect('/'); redirecciona a la vista raiz
        res.status(201).send( { status: "success", payload: generatedProduct } );
    }catch(error){
        //console.log("error: " + error);
        return res.status(404).send( { status: "error", error: error.message } );
    }
}

export const updateProductController = async (req, res) =>{

    const id = req.params.pid;
    const updateProduct = req.body;
    
    try{
        const product = await ProductsService.update(id, updateProduct);
        //const product = productsService.updateProduct( id, updateProduct);
        //const product = await productsModel.updateOne({_id:id}, updateProduct);
        res.status(200).send( { status: "success", payload: product } );
    }catch(error){
        return res.status(404).send( { status: "error", error: error.message } );
    }
}

export const deleteProductController = async (req, res) =>{

    const id = req.params.pid;

    try{
        // aca va service
        await ProductsService.delete(id);
        const products = await ProductsService.getAll();
        //productsService.deleteProduct( id );
        //const products = productsService.getProducts();
        //await productsModel.deleteOne({_id:id});
        //const products = productsModel.find();
        res.status(200).send( { status: "success", payload: products } );
    }catch(error){
        return res.status(404).send( { status: "error", error: error.message } );
    }
}