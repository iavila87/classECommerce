import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import mongoose from 'mongoose'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import initializePassport from './config/passport.config.js'
import viewRouter from './routers/views.router.js'
import productRouter from './routers/products.router.js'
import cartRouter from './routers/carts.router.js'
import sessionRouter from './routers/sessions.router.js'
import messagesModel from './dao/models/messages.model.js'
import { passportCall } from './utils.js'
//import ProductManager from './dao/ProductManager.js'

/** Inicializacion de ProductManager */
//const pm = new ProductManager('./data/products.json');
const mongoURI = 'mongodb+srv://ivanavila:Lexaa.23@cluster0.e811c5s.mongodb.net/?retryWrites=true&w=majority'; 
const mongoDBName = 'ecommerce';

/** Inicializacion de express */
const app = express();

/** Inicializacion de handlebars*/
app.engine('handlebars', handlebars.engine());  // instancia handlebars
app.set('views', './src/views');                // indica donde se encontraran las vistas 
app.set('view engine', 'handlebars');           // confirma que el motor de plantillas es handlebars
/** */

app.use( session({
    store: MongoStore.create({
        mongoUrl: mongoURI, 
        dbName: 'sessions'
    }),
    secret: 'secreto',
    resave: true,
    saveUninitialized: true
}) );

// lo inicializo como middleware
initializePassport();
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.static('./src/public'));        // habilita directorio publico (acceso a los js y css) 
app.use(express.json());
app.use(express.urlencoded({extended:true}))

/* Routers */
app.use('/', viewRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/sessions', sessionRouter);



try{
    /* conecto con la base de datos */
    await mongoose.connect( mongoURI, { dbName: mongoDBName } );

    /** Levanta el servidor http en el puerto 8080 */
    const httpServer = app.listen(8080, () => console.log('Server Up!'));

    /** Levanta servidor websocket */
    const socketServer = new Server(httpServer);

    /** Levanta el evento de nueva conexion */
    socketServer.on('connection', async (clientSocket) => {
        console.log('Cliente Conectado')
        // Emite lista de productos actualizada
        clientSocket.on('listProducts', data => {
            console.log("pase por el listProducts")
            socketServer.emit('updateProducts', data);
        });

        clientSocket.on('message', async (data) => {

            /** por mongoose */
            try{
                const newMessage = data;
                const generatedMessage = new messagesModel(newMessage);
                await generatedMessage.save();
            }catch(error){
                console.log("error: " + error);
            }
            const messages = await messagesModel.find()//.lean().exec();
            socketServer.emit('logs', messages);
        });

    });

    

}catch(error){
    console.log(error.message);
    // si no me conecto a la base de datos termino el proceso
    process.exit(-1);
}
