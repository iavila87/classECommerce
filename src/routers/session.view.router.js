import { Router } from "express";

const router = Router();

router.get('/forget-password', (req, res) => {
    res.render('forget-password');
})