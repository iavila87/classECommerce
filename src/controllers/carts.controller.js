import cartsModel from "../dao/models/carts.model.js"
import productsModel from "../dao/models/products.model.js"

import { ProductsService } from '../repositories/index.js'
import { CartsService } from '../repositories/index.js'


export const createCartController = async (req, res) => {
    
    try{
        const generatedCart = await CartsService.create();
        //const generatedCart = new cartsModel( { products: [] } );
        //await generatedCart.save();
        // res.redirect('/'); redirecciona a la vista raiz
        /*if(typeof newCart == 'string'){
            return res.status(500).send( { status: "error", error: newCart.split(' ').slice(2).join(' ') } );
        }*/
        res.status(201).send( { status: "success", payload: generatedCart } );
    }catch(error){
        console.log('error: '+error);
    }
}

export const addProductToCartController = async (req, res) => {
    
    const cid = req.params.cid;
    const pid = req.params.pid;
    
    try{
        const cart = await ProductsService.getById(id);
        //const cart = await cartsModel.findOne({_id:cid}).lean().exec();
        const product = await ProductsService.getById(id);
        //const product = await productsModel.find({_id:pid});
        console.log("cart " + JSON.stringify(cart))

        const addProduct = cart.products.find(item => item.product == pid);
        console.log("addProduct " + JSON.stringify(addProduct));
        if(!addProduct){
                cart.products.push({ product: pid, quantity: 1 });
        }else{
            cart.products.forEach(pitem =>{
                if(pitem.product == pid){
                    pitem.quantity++;
                }
            });
        }

        const updateCart = await CartsService.update(cid, cart);
        //const updateCart = await cartsModel.updateOne({_id:cid}, cart);

        res.status(201).send( { status: "success", payload: cart } );
    }catch(error){
        console.log('error: '+error);
        res.status(500).send( { status: "error", error: error.message } );
    }
}

export const getCartByIdController = async (req, res) =>{

    const id = req.params.cid;
    
    try{
        
        const cart = await CartsService.getById(id);
        //const cart = await cartsModel.findOne({_id:id});
        /*if(typeof cart == 'string'){
            return res.status(404).send( { status: "error", error: cart.split(' ').slice(2).join(' ') } );
        }*/
        res.status(200).send( { status: "success", payload: cart.products } );
    }catch(error){
        console.log("error: "+error)
        return res.status(500).send( { status: "error", error: error.message } );

    }
}

export const deleteCartController = async (req, res) =>{
        
    const cid = req.params.cid;
    const pid = req.params.pid;
    try{

        const cart = await CartsService.getById(cid);
        //const cart = await cartsModel.findById(cid);
        if(cart === null){
            res.status(404).send({ status: "error", error: "El carrrito no se encontro" });
        }
        
        const product = await ProductsService.getById(pid);
        //const product = await productsModel.findById(pid);
        if(product === null){
            res.status(404).send({ status: "error", error: "El producto no se encontro" });
        }
        
        const deleteProduct = cart.products.find(item => item.product == pid);
            
        if(!deleteProduct){
            res.status(400).send({ status: "error", error: "El producto no se encontro en el carrito" });
        }else{
            cart.products = cart.products.filter(item => item.product.toString() !== pid);
        }
        
        const updateCart = await CartsService.update(cid, cart);
        //const updateCart = await cartsModel.findByIdAndUpdate(cid, cart, {returnDocument: 'after'});
        
        res.status(200).send({ status: "success", payload: updateCart });

    }catch(error){
        res.status(500).send({ status: "error", error: error.message });
    }
}

export const updateCartController = async (req, res) =>{

    const cid = req.params.cid
    try{
        const cart = await CartsService.getById(cid);
        //const cart = await cartsModel.findById(cid);
        if(cart === null){
            res.status(404).send({ status: "error", error: "El carrrito no se encontro" });
        }

        const products = req.body.products;
        if(!products){
            res.status(400).send({ status: "error", error: "no se encontro el campo products" });
        }

        for(let i = 0; i < products.length; i++){
            
            if( !products[i].hasOwnProperty('product') || !products[i].hasOwnProperty('quantity') ){
                res.status(400).send({ status: "error", error: "no se encontraron campos validos" }); 
            }

            if( typeof products[i].quantity !== 'number' ){
                res.status(400).send({ status: "error", error: "quantity no es un numero" }); 
            }

            if( products[i].quantity === 0 ){
                res.status(400).send({ status: "error", error: "el campo quantity no puede ser 0" }); 
            }
            
            const auxProduct = await ProductsService.getById(products[i].product);
            //const auxProduct = await productsModel.findById(products[i].product);
            if(auxProduct == null){
                res.status(400).send({ status: "error", error: "el producto no existe" }); 
            }
        }

        cart.products = products;
        const updateCart = await CartsService.update(cid, cart);
        //const updateCart = await cartsModel.findByIdAndUpdate(cid, cart, {returnDocument: 'after'});
        
        res.status(200).send({ status: "success", payload: updateCart });

    }catch(error){
        res.status(500).send({ status: "error", error: error.message }); 
    }

}

export const updateProductInCartController = async (req, res) =>{

    const cid = req.params.cid
    const pid = req.params.pid
    try{
        const cart = await CartsService.getById(cid);
        //const cart = await cartsModel.findById(cid);
        if(cart === null){
            res.status(404).send({ status: "error", error: "El carrrito no se encontro" });
        }

        const product = await ProductsService.getById(pid);
        //const product = await productsModel.findById(pid);
        if(product === null){
            res.status(404).send({ status: "error", error: "El producto no se encontro" });
        }

        const quantity = req.body.quantity;
        if(!quantity){
            res.status(400).send({ status: "error", error: "no se encontro el campo quantity" });
        }

        if( typeof quantity !== 'number' ){
            res.status(400).send({ status: "error", error: "quantity no es un numero" }); 
        }

        if( quantity === 0 ){
            res.status(400).send({ status: "error", error: "el campo quantity no puede ser 0" }); 
        }
        console.log("cart: "+JSON.stringify(cart) );
        cart.products.forEach(pitem =>{
            if(pitem.product == pid){
                pitem.quantity = quantity;
                console.log("entre al product == pid");
            }
        });
        
        const updateCart = await CartsService.update(cid, cart);
        //const updateCart = await cartsModel.findByIdAndUpdate(cid, cart, {returnDocument: 'after'});
        
        res.status(200).send({ status: "success", payload: updateCart });

    }catch(error){
        res.status(500).send({ status: "error", error: error.message }); 
    }

}

export const deleteProductInCartController = async (req, res) =>{
        
    const cid = req.params.cid;
    try{
        const cart = await CartsService.getById(cid);
        //const cart = await cartsModel.findById(cid);
        if(cart === null){
            res.status(404).send({ status: "error", error: "El carrrito no se encontro" });
        }

        cart.products = [];
        const updateCart = await CartsService.update(cid, cart);
        //const updateCart = await cartsModel.findByIdAndUpdate(cid, cart, {returnDocument: 'after'});
        
        res.status(200).send({ status: "success", payload: updateCart });

    }catch(error){
        res.status(500).send({ status: "error", error: error.message });
    }
}