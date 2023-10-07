import { Router } from "express";
import usersModel from "../dao/models/users.model.js";
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";
const router = Router();

/** Metodo POST */
router.post('/register', 
    passport.authenticate('register', {failureRedirect: '/sessions/failRegister'}) ,
    async (req, res) => {
        res.redirect('/');
});

router.get('/failRegister', (req, res) => {
    res.send({status:'error', error:'passport register failed'})
});

/** Metodo POST */
router.post('/login',
    passport.authenticate('login', {failureRedirect: '/sessions/failLogin'}), 
    async (req, res) => {
        if(!req.user){
            res.status(400).send({status: 'error', error:'invalid credentials'});
        }

        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age
        }

        res.redirect('/products');
});

router.get('/failLogin', (req, res) => {
    res.send({status:'error', error:'passport login failed'})
});

/** Metodo GET */
router.get('/logout', async (req, res) => {
    
    req.session.destroy( error => {
        if(error){
            return res.status(500).send( { status: "error", error: error.message } );
        }else{
           return res.redirect('/');
        }
    })
    
});


export default router