import express from 'express'
import handlebars from 'express-handlebars'
import viewRouter from './routers/views.router.js'
import productRouter from './routers/products.router.js'
import cartRouter from './routers/carts.router.js'

/** Inicializacion de express */
const app = express();
/** Inicializacion de handlebars*/
app.engine('handlebars', handlebars.engine());  // instancia handlebars
app.set('views', './src/views');                // indica donde se encontraran las vistas 
app.set('view engine', 'handlebars');           // confirma que el motor de plantillas es handlebars
/** */
app.use(express.json());

/* Routers */
app.use('/', viewRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

/** Levanto el servidor para que escuche en el puerto 8080 */
app.listen(8080, () => console.log('Server Up!'));
