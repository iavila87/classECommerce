import { Router } from "express";
import CartManager from '../dao/CartManager.js'
import cartsModel from "../dao/models/carts.model.js"
import productsModel from "../dao/models/products.model.js" 

/** Inicializacion de CartManager */
//const cm = new CartManager('./data/carts.json');

const router = Router();

/** Metodos POST */
/** post 'api/carts/' */
router.post('/', async (req, res) => {
    /** por filesystem */
    //const newCart = await cm.createCart();
    
    /** por mongoose */
    try{
        const generatedCart = new cartsModel( { products: [] } );
        await generatedCart.save();
        // res.redirect('/'); redirecciona a la vista raiz
        /*if(typeof newCart == 'string'){
            return res.status(500).send( { status: "error", error: newCart.split(' ').slice(2).join(' ') } );
        }*/
        res.status(201).send( { status: "success", payload: generatedCart } );
    }catch(error){
        console.log('error: '+error);
    }
});

/** post 'api/carts/:cid/product/:pid' */
router.post('/:cid/product/:pid', async (req, res) => {
    
    const cid = req.params.cid;
    const pid = req.params.pid;
    /** por fileSystem */
    //const addProduct = await cm.addProductCartById(cid, pid);
    
    /** por mongoose */
    try{
        const cart = await cartsModel.findOne({_id:cid}).lean().exec();
        const product = await productsModel.find({_id:pid});
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

        const updateCart = await cartsModel.updateOne({_id:cid}, cart);

        res.status(201).send( { status: "success", payload: cart } );
    }catch(error){
        console.log('error: '+error);
        res.status(500).send( { status: "error", error: error.message } );
    }
});


/** Metodo GET*/
/** get 'api/carts/:cid' */
router.get('/:cid', async (req, res) =>{

    const id = req.params.cid;
    /** por filesystem */
    //const cart = await cm.getCartById(id);

    /** por mongoose */
    try{
        const cart = await cartsModel.findOne({_id:id});
        /*if(typeof cart == 'string'){
            return res.status(404).send( { status: "error", error: cart.split(' ').slice(2).join(' ') } );
        }*/
        res.status(200).send( { status: "success", payload: cart.products } );
    }catch(error){
        console.log("error: "+error)
        return res.status(500).send( { status: "error", error: error.message } );

    }
});

/** Elimina un product de un cart */
router.delete('/:cid/product/:pid', async (req, res) =>{
        
        const cid = req.params.cid;
        const pid = req.params.pid;
        try{
        const cart = await cartsModel.findById(cid);
        if(cart === null){
            res.status(404).send({ status: "error", error: "El carrrito no se encontro" });
        }

        const product = await productsModel.findById(pid);
        if(product === null){
            res.status(404).send({ status: "error", error: "El producto no se encontro" });
        }

        const deleteProduct = cart.products.find(item => item.product == pid);
            
        if(!deleteProduct){
            res.status(400).send({ status: "error", error: "El producto no se encontro en el carrito" });
        }else{
            cart.products = cart.products.filter(item => item.product.toString() !== pid);
        }
        const updateCart = await cartsModel.findByIdAndUpdate(cid, cart, {returnDocument: 'after'});
        
        res.status(200).send({ status: "success", payload: updateCart });
    
    }catch(error){
        res.status(500).send({ status: "error", error: error.message });
    }
});

/** Actualiza un cart con un array de productos*/
router.put('/:cid', async (req, res) =>{

    const cid = req.params.cid
    try{
        const cart = await cartsModel.findById(cid);
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

            const auxProduct = await productsModel.findById(products[i].product);
            if(auxProduct == null){
                res.status(400).send({ status: "error", error: "el producto no existe" }); 
            }
        }

        cart.products = products;
        const updateCart = await cartsModel.findByIdAndUpdate(cid, cart, {returnDocument: 'after'});
        
        res.status(200).send({ status: "success", payload: updateCart });

    }catch(error){
        res.status(500).send({ status: "error", error: error.message }); 
    }

});

/** Actualiza quantity de un producto en un cart */
router.put('/:cid/product/:pid', async (req, res) =>{

    const cid = req.params.cid
    const pid = req.params.pid
    try{
        const cart = await cartsModel.findById(cid);
        if(cart === null){
            res.status(404).send({ status: "error", error: "El carrrito no se encontro" });
        }

        const product = await productsModel.findById(pid);
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

        const updateCart = await cartsModel.findByIdAndUpdate(cid, cart, {returnDocument: 'after'});
        
        res.status(200).send({ status: "success", payload: updateCart });

    }catch(error){
        res.status(500).send({ status: "error", error: error.message }); 
    }

});

/** Elimina un product de un cart */
router.delete('/:cid', async (req, res) =>{
        
    const cid = req.params.cid;
    try{
        const cart = await cartsModel.findById(cid);
        if(cart === null){
            res.status(404).send({ status: "error", error: "El carrrito no se encontro" });
        }

        cart.products = [];
        const updateCart = await cartsModel.findByIdAndUpdate(cid, cart, {returnDocument: 'after'});
        
        res.status(200).send({ status: "success", payload: updateCart });

    }catch(error){
        res.status(500).send({ status: "error", error: error.message });
    }
});

export default router;