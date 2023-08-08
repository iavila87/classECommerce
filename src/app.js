import express from 'express'
import  ProductManager  from './ProductManager.js'

/** Inicializacion de express */
const app = express();
/** Inicializacion de ProductManager */
const pm = new ProductManager('./data/products.json');

/** get '/products' y '/products?limit='*/
app.get('/products', async (req,res) =>{

    const limit = req.query.limit;
    const products = await pm.getProducts();

    if(typeof products == 'string') {
        return res.status(404).send( {error: products.split(' ').slice(2).join(' ')} );
    }

    if(!limit) {
        return res.status(200).send(products);
    }

    res.status(200).send(products.slice(0,limit));
});

/** get '/products/:pid' */
app.get('/products/:pid', async (req,res) =>{

    const id = req.params.pid;
    const product = await pm.getProductById( parseInt(id) );

    if(typeof product !== 'string'){
        return res.status(200).send(product);
    }

    res.status(404).send( {error: product.split(' ').slice(2).join(' ')} );
});

/** Levanto el servidor para que escuche en el puerto 8080 */
app.listen(8080, () => console.log('Server Up!'));
