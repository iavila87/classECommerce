import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import mongoose from 'mongoose'
import viewRouter from './routers/views.router.js'
import productRouter from './routers/products.router.js'
import cartRouter from './routers/carts.router.js'
import ProductManager from './dao/ProductManager.js'


mongoose.connect('mongodb+srv://ivanavila:Lexaa.23@cluster0.e811c5s.mongodb.net/?retryWrites=true&w=majority');

/** Inicializacion de ProductManager */
//const pm = new ProductManager('./data/products.json');

/** Inicializacion de express */
const app = express();
/** Inicializacion de handlebars*/
app.engine('handlebars', handlebars.engine());  // instancia handlebars
app.set('views', './src/views');                // indica donde se encontraran las vistas 
app.set('view engine', 'handlebars');           // confirma que el motor de plantillas es handlebars
/** */
app.use(express.static('./src/public'));        // habilita directorio publico (acceso a los js y css) 
app.use(express.json());

/* Routers */
app.use('/', viewRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

/** Levanta el servidor http en el puerto 8080 */
const httpServer = app.listen(8080, () => console.log('Server Up!'));

/** Levanta servidor websocket */
const socketServer = new Server(httpServer);

/** Levanta el evento de nueva conexion */
socketServer.on('connection', async (clientSocket) => {
    console.log('Cliente Conectado')

    /*clientSocket.on("postProduct", async (data) => {
        console.log (await pm.addProduct(data));
        const products = await pm.getProducts();
        io.sockets.emit("message", products);
    });
*/

    // Emite lista de productos actualizada
    clientSocket.on('listProducts', data => {
        console.log("pase por el listProducts")
        socketServer.emit('updateProducts', data);
    });

});