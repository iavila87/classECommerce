import express from 'express'
import { ProductManager } from './ProductManager'

/** Inicializacion de express */
const app = express();






/** Levanto el servidor para que escuche en el puerto 8080 */
app.listen(8080, () => console.log('Server Up!'));
