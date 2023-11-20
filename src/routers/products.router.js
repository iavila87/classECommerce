import { Router } from "express";
import  {   getAllProductsController,
            getProductByIdController,
            createProductController,
            updateProductController,
            deleteProductController 
        } from "../controllers/products.controller.js"

import { handlePolicies } from "../utils.js";

/** Inicializacion de ProductManager */
//const pm = new ProductManager('./data/products.json');
const router = Router();
/** get 'api/products' y 'api/products?limit='*/
router.get('/', handlePolicies(['USER', 'ADMIN']), getAllProductsController);
/** get 'api/products/:pid' */
router.get('/:pid', handlePolicies(['USER', 'ADMIN']), getProductByIdController);
/** Metodo POST */
router.post('/', handlePolicies(['ADMIN']),createProductController);
/** Metodo PUT */
router.put('/:pid', handlePolicies(['ADMIN']), updateProductController);
/** Metodo DELETE */
router.delete('/:pid', handlePolicies(['ADMIN']), deleteProductController);

export default router;