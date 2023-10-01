import { Router } from "express";
import usersModel from "../dao/models/users.model.js";

const router = Router();

/** Metodo POST */
router.post('/register', async (req, res) => {
    
    const userRegister = req.body;
    const user = new usersModel(userRegister);
    await user.save();
    res.redirect('/');
});

/** Metodo POST */
router.post('/login', async (req, res) => {
    
    const { email, password } = req.body;
    /** por mongoose */
    console.log("pase por login")
    try{
        const user = await usersModel.findOne({ email, password }).lean().exec();
        
        if(!user) return res.redirect('/');
        
        if(user.email == 'adminCoder@coder.com' && user.password == 'adminCod3r123'){
            user.role = 'admin';
        }else{
            user.role = 'user';
        }

        req.session.user = user;
            
        res.redirect('/products');

    }catch(error){
        return res.status(404).send( { status: "error", error: error.message } );
    }
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