import { Router } from "express";
import {
            loginViewController,
            registerViewController,
            realTimeProductsViewController,
            chatViewController,
            productsViewController,
            cartViewController
        } from "../controllers/views.controller.js"
import { auth } from '../middlewares/auth.middleware.js'
import ProductManager from '../dao/ProductManager.js'
import productsModel from "../dao/models/products.model.js"
import cartsModel from "../dao/models/carts.model.js";
import passport from "passport";
import { handlePolicies, passportCall } from "../utils.js";

/** Inicializacion de ProductManager */
//const pm = new ProductManager('./data/products.json');
const router = Router();
router.get('/', loginViewController);
router.get('/register', registerViewController);
router.get('/realtimeproducts', auth, realTimeProductsViewController);
// chat
router.get('/chat', auth, chatViewController);
// products
router.get('/products', passportCall('jwt'), handlePolicies(['ADMIN']), productsViewController);
// carts
router.get('/carts/:cid', auth, cartViewController);

export default router