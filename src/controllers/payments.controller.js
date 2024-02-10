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
        console.log("title: "+ JSON.stringify(cart.products[i].product.title));
        console.log("description: "+ JSON.stringify(cart.products[i].product.description));
        console.log("price: "+ JSON.stringify(cart.products[i].product.price));
        console.log("quantity: "+ JSON.stringify(cart.products[i].quantity));
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

/*
line_items:[
            {
                price_data: 
                {
                    product_data: 
                    {
                        name: 'laptop',
                        description: 'super laptop',

                    },
                    currency: 'usd',
                    unit_amount: 200000 // 2000.00
                },
                quantity: 2
            },
            {
                price_data: 
                {
                    product_data: 
                    {
                        name: 'TV',
                        description: 'super TV',

                    },
                    currency: 'usd',
                    unit_amount: 40050 // 400.50
                },
                quantity: 3
            }
        ]
*/