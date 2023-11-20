import cartsModel from "../dao/models/carts.model.js"
import productsModel from "../dao/models/products.model.js"

import { ProductsService } from '../repositories/index.js'
import { CartsService } from '../repositories/index.js'
import { TicketsService } from '../repositories/index.js'


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
        const cart = await CartsService.getById(cid);
        //const cart = await cartsModel.findOne({_id:cid}).lean().exec();
        const product = await ProductsService.getById(pid);
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



export const purchaseController = async(req, res) => {
    try {
        const cid = req.params.cid
        const cartToPurchase = await CartsService.getById(cid);
        if (cartToPurchase === null) {
            return res.status(404).json({ status: 'error', error: `Cart with id=${cid} Not found` })
        }
        let productsToTicket = []
        let productsAfterPurchase = cartToPurchase.products
        let amount = 0
        for (let index = 0; index < cartToPurchase.products.length; index++) {
            const productToPurchase = await ProductsService.getById(cartToPurchase.products[index].product)
            if (productToPurchase === null) {
                return res.status(400).json({ status: 'error', error: `Product with id=${cartToPurchase.products[index].product} does not exist. We cannot purchase this product` })
            }
            if (cartToPurchase.products[index].quantity <= productToPurchase.stock) {
                //actualizo el stock del producto que se está comprando
                productToPurchase.stock -= cartToPurchase.products[index].quantity
                await ProductsService.update(productToPurchase._id, { stock: productToPurchase.stock })
                //elimino del carrito los productos que se han comparado
                productsAfterPurchase = productsAfterPurchase.filter(item => item.product.toString() !== cartToPurchase.products[index].product.toString())
                //calculo el total del ticket
                amount += (productToPurchase.price * cartToPurchase.products[index].quantity)
                //coloco el producto en el Ticket
                productsToTicket.push({ product: productToPurchase._id, price: productToPurchase.price, quantity: cartToPurchase.products[index].quantity})
            }
        }
        //elimino del carrito los productos que se han comparado
        await CartsService.update(cid, { products: productsAfterPurchase });
        //creo un Ticket
        const result = await TicketsService.create({
            code: shortid.generate(),
            products: productsToTicket,
            amount,
            purchaser: req.session.user.email
        })
        return res.status(201).json({ status: 'success', payload: result })
    } catch(err) {
        return res.status(500).json({ status: 'error', error: err.message })
    }
}

