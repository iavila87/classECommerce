import express from 'express'
import  ProductManager  from './ProductManager.js'

/** Inicializacion de express */
const app = express();
const pm = new ProductManager('./data/products.json');





/** Levanto el servidor para que escuche en el puerto 8080 */
app.listen(8080, () => console.log('Server Up!'));
