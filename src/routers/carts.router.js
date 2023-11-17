import { Router } from "express";
import  {   createCartController,
            addProductToCartController,
            getCartByIdController,
            deleteCartController,
            updateCartController,
            updateProductInCartController,
            deleteProductInCartController,
            purchaseController
        } from "../controllers/carts.controller.js"
        
import CartManager from '../dao/CartManager.js'
import cartsModel from "../dao/models/carts.model.js"
import productsModel from "../dao/models/products.model.js" 

/** Inicializacion de CartManager */
//const cm = new CartManager('./data/carts.json');
const router = Router();
/** Metodos POST */
/** post 'api/carts/' */
router.post('/', createCartController);
/** post 'api/carts/:cid/product/:pid' */
router.post('/:cid/product/:pid', addProductToCartController);
/** Metodo GET*/
/** get 'api/carts/:cid' */
router.get('/:cid', getCartByIdController);
/** Elimina un product de un cart */
router.delete('/:cid/product/:pid', deleteCartController);
/** Actualiza un cart con un array de productos*/
router.put('/:cid', updateCartController);
/** Actualiza quantity de un producto en un cart */
router.put('/:cid/product/:pid', updateProductInCartController);
/** Elimina un product de un cart */
router.delete('/:cid', deleteProductInCartController);

// carts, la ruta /:cid/purchase,
router.get('/:cid/purchase', purchaseController);

export default router;