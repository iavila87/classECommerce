import { Router } from "express";
import CartManager from '../dao/CartManager.js'
import cartsModel from "../dao/models/carts.model.js"
import productsModel from "../dao/models/products.model.js" 

/** Inicializacion de CartManager */
const cm = new CartManager('./data/carts.json');

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
        
        const addProduct = cart.products.find(item => item.product == pid);
        
        if(!addProduct){
                cart.products.push({ product: pid, quantity: 1 });
        }else{
            cart.products.forEach(pitem =>{
                if(pitem.product === pid){
                    pitem.quantity++;
                }
            });
        }

        const updateCart = await cartsModel.updateOne({_id:cid}, cart);


        /*if(typeof addProduct == 'string'){
            return res.status(404).send( { status: "error", error: addProduct.split(' ').slice(2).join(' ') } );
        }*/

        res.status(201).send( { status: "success", payload: cart } );
    }catch(error){
        console.log('error: '+error);
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
    }
});

export default router;