import Stripe from "stripe"
import config from '../config/config.js'
import { CartsService } from "../repositories/index.js";

const STRIPE_SK = config.stripe.secret;
const stripe = new Stripe(STRIPE_SK);

export const createSessionController = async (req, res) => {
    const idcart = req.params.cid;
    const cart = await CartsService.getByIdView(idcart);

    let line_items = [];
    let item;
    for(let i = 0; i< cart.products.length; i++){
        // genero la estructura
        item = {
            price_data: {
                product_data:{
                    name: cart.products[i].product.title,
                    description: cart.products[i].product.description
                },
                currency: 'usd',
                unit_amount: (cart.products[i].product.price)*100
            },
            quantity: cart.products[i].quantity
        };

        line_items.push(item);
    }


    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        success_url: 'http://localhost:8080/api/pays/success',
        cancel_url: 'http://localhost:8080/api/pays/cancel'
    });

    return res.send(session);
}

export const paySuccessController = async (req, res) => {
    const user = req.user.user
    const cart = await CartsService.getById(user.cart)    
    cart.products = [];
    const updateCart = await CartsService.update(cid, cart);

    return res.render('paySuccess');
}

export const payCancelController = (req, res) => {
    return res.render('payCancel');
}