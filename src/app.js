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
import userRouter from './routers/users.router.js'
import paymentRouter from './routers/payments.router.js'
import messagesModel from './dao/models/messages.model.js'
import loggerTestRouter from './routers/loggerTest.router.js'
import { passportCall } from './utils.js'
import config from './config/config.js'
import MongoClient from './dao/MongoClient.js'
import logger from './logger.js'
//import ProductManager from './dao/ProductManager.js'

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";


const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: 'Documentacion para el cliente',
            description: 'Descripcion del proyecto'
        }
    },
    apis: ['./docs/**/*.yaml']
}

const specs = swaggerJSDoc(swaggerOptions);


/** Inicializacion de ProductManager */
//const pm = new ProductManager('./data/products.json');
const PORT = config.apiserver.port;
const mongoURI = config.mongo.uri; 
const mongoDBName = config.mongo.dbname;

/** Inicializacion de express */
const app = express();

let client = new MongoClient();
client.connect();

/** Inicializacion de handlebars*/
app.engine('handlebars', handlebars.engine());  // instancia handlebars
app.set('views', './src/views');                // indica donde se encontraran las vistas 
app.set('view engine', 'handlebars');           // confirma que el motor de plantillas es handlebars
/** */

app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use( session({
    
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
app.use('/api/users', userRouter);
app.use('/api/pays', paymentRouter);
app.use('/loggerTest', loggerTestRouter);



try{
    /* conecto con la base de datos */
    //await mongoose.connect( mongoURI, { dbName: mongoDBName } );

    /** Levanta el servidor http en el puerto 8080 */
    logger.info("Port: "+ PORT)
    const httpServer = app.listen(PORT, () => logger.info('Server Up!'));

    /** Levanta servidor websocket */
    const socketServer = new Server(httpServer);

    /** Levanta el evento de nueva conexion */
    socketServer.on('connection', async (clientSocket) => {
        logger.info('Cliente Conectado');
        // Emite lista de productos actualizada
        clientSocket.on('listProducts', data => {
            socketServer.emit('updateProducts', data);
        });

        clientSocket.on('message', async (data) => {
            try{
                const newMessage = data;
                const generatedMessage = new messagesModel(newMessage);
                await generatedMessage.save();
            }catch(error){
                logger.error(error);
            }
            const messages = await messagesModel.find()//.lean().exec();
            socketServer.emit('logs', messages);
        });

    });

}catch(error){
    logger.error(error.message);
    // si no me conecto a la base de datos termino el proceso
    process.exit(-1);
}
