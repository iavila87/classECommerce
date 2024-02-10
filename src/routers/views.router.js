import { Router } from "express";
import {
            loginViewController,
            registerViewController,
            realTimeProductsViewController,
            chatViewController,
            productsViewController,
            cartViewController,
            mockingProductsViewController,
            paySessionController
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
router.get('/realtimeproducts', handlePolicies(['USER', 'ADMIN']), realTimeProductsViewController);
// mock
router.get('/mockingproducts', mockingProductsViewController);
// chat
router.get('/chat', handlePolicies(['USER']), chatViewController);
// products
router.get('/products', passportCall('jwt'), handlePolicies(['USER', 'ADMIN']), productsViewController);
// carts
router.get('/carts/:cid', handlePolicies(['USER', 'ADMIN']), cartViewController);

router.get('/checkout', passportCall('jwt'), paySessionController);


router.get('/forget-password', (req, res) => {
    res.render('forget-password');
})

router.get('/reset-password/:token', (req, res) => {
    res.redirect(`/api/sessions/verify-token/${req.params.token}`)
})

export default router