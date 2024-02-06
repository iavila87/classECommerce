import Stripe from "stripe"
import config from '../config/config.js'

const STRIPE_SK = config.stripe.secret;
const stripe = new Stripe(STRIPE_SK);

export const createSessionController = async (req, res) => {
    const session = await stripe.checkout.sessions.create({
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
        ],
        mode: 'payment',
        success_url: 'http://localhost:8080/api/pays/success',
        cancel_url: 'http://localhost:8080/api/pays/cancel'
    });

    return res.send(session);
}