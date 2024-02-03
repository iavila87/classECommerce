import { Router } from "express";
import {
            registerSessionController,
            failRegisterSessionController,
            loginSessionController,
            failLoginSessionController,
            logoutSessiontroller,
            currentSessionController,
            githubSessionController,
            forgetPasswordSessionController,
            verifyTokenSessionController,
            resetPasswordSessionController
} from "../controllers/sessions.controller.js"

import { JWT_COOKIE_NAME, createHash, extractCookie, isValidPassword } from "../utils.js";
import passport from "passport";

const router = Router();
/** Metodo POST */
router.post('/register', 
    passport.authenticate('register', {failureRedirect: '/sessions/failRegister'}), 
    registerSessionController);

router.get('/failRegister', failRegisterSessionController);
/** Metodo POST */
router.post('/login',
    passport.authenticate('login', {failureRedirect: '/sessions/failLogin'}), 
    loginSessionController);

router.get('/failLogin', failLoginSessionController);
/** Metodo GET */
router.get('/logout', logoutSessiontroller);
/** Metodo GET */
router.get('/current', currentSessionController);

router.get('/github', passport.authenticate('github',{scope:['user:email']}), (req,res) => {});

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), githubSessionController)

// Rutas para recuperacion del password
router.post('/forget-password', forgetPasswordSessionController)

router.get('/verify-token/:token', verifyTokenSessionController);

router.post('/reset-password/:user', resetPasswordSessionController);

export default router