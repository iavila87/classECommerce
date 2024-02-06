import { Router } from "express";
import { createSessionController } from "../controllers/payments.controller.js";

const router = Router();

router.post('/create-checkout-session', createSessionController);

router.get('/success', (req, res) => { return res.send('success') });

router.get('/cancel', (req, res) => { return res.send('cancel') });


export default router;