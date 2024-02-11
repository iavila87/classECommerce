import { Router } from "express";
import {
            loginViewController,
            registerViewController,
            realTimeProductsViewController,
            chatViewController,
            productsViewController,
            cartViewController,
            mockingProductsViewController,
            paySessionController,
            userPanelController
        } from "../controllers/views.controller.js"
import { auth } from '../middlewares/auth.middleware.js'
import ProductManager from '../dao/ProductManager.js'
import productsModel from "../dao/models/products.model.js"
import cartsModel from "../dao/models/carts.model.js";
import passport from "passport";
import { handlePolicies, passportCall, publicRoutes } from "../utils.js";

/** Inicializacion de ProductManager */
//const pm = new ProductManager('./data/products.json');
const router = Router();
router.get('/', handlePolicies(['PUBLIC']),loginViewController);
router.get('/register', registerViewController);
router.get('/realtimeproducts', handlePolicies(['USER', 'PREMIUM', 'ADMIN']), realTimeProductsViewController);
// mock
router.get('/mockingproducts', mockingProductsViewController);
// chat
router.get('/chat', handlePolicies(['USER']), chatViewController);
// products
router.get('/products', passportCall('jwt'), handlePolicies(['USER', 'PREMIUM', 'ADMIN']), productsViewController);
// carts
router.get('/carts/:cid', handlePolicies(['USER', 'PREMIUM', 'ADMIN']), cartViewController);

router.get('/checkout', passportCall('jwt'), paySessionController);

router.get('/users-panel', passportCall('jwt'), userPanelController);

router.get('/forget-password', (req, res) => {
    res.render('forget-password');
})

router.get('/reset-password/:token', (req, res) => {
    res.redirect(`/api/sessions/verify-token/${req.params.token}`)
})

export default router