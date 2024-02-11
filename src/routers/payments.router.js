import { Router } from "express";
import {    createSessionController,
            paySuccessController,
            payCancelController } from "../controllers/payments.controller.js";
import { handlePolicies, passportCall } from "../utils.js";

const router = Router();

router.post('/create-checkout-session/:cid', createSessionController);

router.get('/success', passportCall('jwt'), handlePolicies(['USER', 'PREMIUM', 'ADMIN']), paySuccessController); 

router.get('/cancel', payCancelController);


export default router;