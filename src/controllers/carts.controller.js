import cartsModel from "../dao/models/carts.model.js"
import productsModel from "../dao/models/products.model.js"

export const createCartController = async (req, res) => {
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
}

export const addProductToCartController = async (req, res) => {
    
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
}

export const getCartByIdController = async (req, res) =>{

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
}

