import { Router } from "express";
import usersModel from "../dao/models/users.model.js";
import { JWT_COOKIE_NAME, createHash, isValidPassword } from "../utils.js";
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
        console.log('req: '+req.user);
        if(!req.user){
            return res.status(400).send({status: 'error', error:'invalid credentials'});
        }

        // antes de redireccionar guardo el token en la cookie
        return res.cookie(JWT_COOKIE_NAME, req.user.token).redirect('/products');
});

router.get('/failLogin', (req, res) => {
    res.send({status:'error', error:'passport login failed'})
});

/** Metodo GET */
router.get('/logout', async (req, res) => {
    req.clearCookie(JWT_COOKIE_NAME).redirect('/');
    
});

router.get('/github', passport.authenticate('github',{scope:['user:email']}), (req,res) => {

});

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), 
    async (req, res)=>{
        req.session.user = req.user;
        res.redirect('/products');
    })
export default router