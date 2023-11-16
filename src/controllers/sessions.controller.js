import UsersDTO from "../dto/users.dto.js";
import { JWT_COOKIE_NAME, createHash, extractCookie, isValidPassword } from "../utils.js";

export const registerSessionController = async (req, res) => {
    res.redirect('/');
}

export const failRegisterSessionController = (req, res) => {
    res.send({status:'error', error:'passport register failed'})
}

export const loginSessionController = async (req, res) => {
    if(!req.user){
        return res.status(400).send({status: 'error', error:'invalid credentials'});
    }

    // antes de redireccionar guardo el token en la cookie
    return res.cookie(JWT_COOKIE_NAME, req.user.token).redirect('/products');
}

export const failLoginSessionController = (req, res) => {
    res.send({status:'error', error:'passport login failed'})
}

export const logoutSessiontroller = async (req, res) => {
    req.clearCookie(JWT_COOKIE_NAME).redirect('/');
}

export const currentSessionController = async (req, res) => {
    const user = req.user.user
    const userDTO = new UsersDTO(user);
    return res.status(200).send(userDTO);
    
}

export const githubSessionController = async (req, res)=>{
    req.session.user = req.user;
    res.redirect('/products');
}