import { Router } from "express";
import  {   getAllProductsController,
            getProductByIdController,
            createProductController,
            updateProductController,
            deleteProductController 
        } from "../controllers/products.controller.js"

/** Inicializacion de ProductManager */
//const pm = new ProductManager('./data/products.json');
const router = Router();
/** get 'api/products' y 'api/products?limit='*/
router.get('/', getAllProductsController);
/** get 'api/products/:pid' */
router.get('/:pid', getProductByIdController);
/** Metodo POST */
router.post('/', createProductController);
/** Metodo PUT */
router.put('/:pid', updateProductController);
/** Metodo DELETE */
router.delete('/:pid', deleteProductController);

export default router;