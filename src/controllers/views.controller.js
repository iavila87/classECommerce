import productsModel from "../dao/models/products.model.js"
import cartsModel from "../dao/models/carts.model.js";
import { ProductsService } from '../repositories/index.js'
export const loginViewController = async (req, res) => {
    res.render('login', { // como segundo argumento le paso argumentos como objetos
    });
}

export const registerViewController = async (req, res) => {
    
    res.render('register', { // como segundo argumento le paso argumentos como objetos
    });

}

export const realTimeProductsViewController = async (req, res) => {
    // consulta productos
    const products = await productsModel.find().lean().exec();
    const emptyProducts = typeof products == 'string' || products.length == 0;

    res.render('realTimeProducts', { // como segundo argumento le paso argumentos como objetos
        emptyProducts,
        products
    });     // renderiza el home.handlebars en main.handlebars
}

export const chatViewController = async (req, res) => {
    // consulta productos
    /** por filesystem */
    //const products = await pm.getProducts();
    const products = await productsModel.find().lean().exec();
    const emptyProducts = typeof products == 'string' || products.length == 0;

    res.render('chat', { // como segundo argumento le paso argumentos como objetos
        emptyProducts,
        products
    });     // renderiza el home.handlebars en main.handlebars
}

export const productsViewController = async (req, res) => {

    //const products = await productsModel.find().lean().exec();
    //const emptyProducts = typeof products == 'string' || products.length == 0;
    
    /* const limit contiene el valor del queryparam(limit)
    en caso de que este no exista por defecto se le asigna 10 */
    const limit = req.query.limit || 10;
    /* const page contiene el valor del queryparam(page)
    en caso de que este no exista por defecto se le asigna 1 */
    const page = req.query.page || 1;
    const filters = {};
    if(req.query.category)  filters.category = req.query.category;
    if(req.query.stock)     filters.stock = req.query.stock;
    /** paginacion */
    const paginateOptions = { lean:true, limit, page };
    if(req.query.sort === 'asc') paginateOptions.sort = {price : 1};
    if(req.query.sort === 'desc') paginateOptions.sort = {price : -1};
    try{
        const products = await ProductsService.getAll(filters, paginateOptions); //await productsModel.paginate( filters, paginateOptions );
        
        let prevLink;
        if(!req.query.page){
            prevLink = `http://${req.hostname}:8080${req.originalUrl}&page=${products.prevPage}`;
        }else{
            const urlMod = req.originalUrl.replace(`page=${req.query.page}`,`?page=${products.prevPage}`);
            prevLink = `http://${req.hostname}:8080${urlMod}`;
        }

        let nextLink;
        if(!req.query.page){
            nextLink = `http://${req.hostname}:8080${req.originalUrl}&page=${products.nextPage}`;
        }else{
            const urlMod = req.originalUrl.replace(`page=${req.query.page}`,`page=${products.nextPage}`);
            nextLink = `http://${req.hostname}:8080${urlMod}`;
        }

        const totalPages = [];
        let link;

        for(let i = 1; i<= products.totalPages; i++){
            if(!req.query.page){
                link = `http://${req.hostname}:8080${req.originalUrl}?&page=${i}`;
            }else{
                const urlMod = req.originalUrl.replace(`page=${req.query.page}`,`page=${i}`);
                link = `http://${req.hostname}:8080${urlMod}`;
            }
            totalPages.push( { page: i, link } );
        }
        const user = req.user.user;
        
        res.render('home', { // como segundo argumento le paso argumentos como objetos
            user,
            emptyProducts: false,
            products: products.docs,
            paginateInfo: {
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevLink: products.prevLink,
                nextLink: products.nextLink,
                totalPages
            }
        });     // renderiza el home.handlebars en main.handlebars

    }catch(error){
        return res.status(500).send( { status: "error", error: error.message } );
    }
}

export const cartViewController = async (req, res) => {
    
    const cid = req.params.cid;
    const cart = await cartsModel.findOne({_id:cid}).populate('products.product').lean().exec();
    //const emptyProducts = typeof products == 'string' || products.length == 0;
    console.log(JSON.stringify(cart))
    res.render('carts', { // como segundo argumento le paso argumentos como objetos
        //emptyProducts,
        cart
    });     // renderiza el home.handlebars en main.handlebars
}