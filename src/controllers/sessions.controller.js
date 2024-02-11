import nodemailer from 'nodemailer'
import UsersDTO from "../dto/users.dto.js";
import { UsersService, UserPasswordService } from '../repositories/index.js'
import { generateRandomString } from '../utils.js';
import config from '../config/config.js';

import { JWT_COOKIE_NAME, createHash, extractCookie, isValidPassword } from "../utils.js";
import logger from '../logger.js'

const PORT = config.apiserver.port;

export const registerSessionController = async (req, res) => {
    res.redirect('/');
}

export const failRegisterSessionController = (req, res) => {
    logger.error("passport register failed");
    res.send({status:'error', error:'passport register failed'})
}

export const loginSessionController = async (req, res) => {
    console.log('login req.user '+JSON.stringify(req.user))
    if(!req.user){
        return res.status(400).send({status: 'error', error:'invalid credentials'});
    }

    const lastUser = await UsersService.updateLastConn(req.user.email)
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


export const githubSessionController = async (req, res)=> {
    req.session.user = req.user;
    res.redirect('/products');
}

// envio de mail para cambio de contraseña
export const forgetPasswordSessionController = async (req, res) => {
    const email = req.body.email;
    const user = await UsersService.get(email);
    if (!user) {
        return res.status(404).send({ status: 'error', error: 'User not found' });
    }
    const token = generateRandomString(16); // genero un string de longitud 16
    
    // creo en la base de datos el usuario y token para la recuperacion del password
    await UserPasswordService.save({ email, token });
    
    // configuro mailer para el envio
    const mailerConfig = {
        service: 'gmail',
        auth: { user: config.nodemailer.user, pass: config.nodemailer.pass },
        tls: {
            rejectUnauthorized: false
        }
        
    }

    // transporter
    let transporter = nodemailer.createTransport(mailerConfig);
    
    // message
    let message = {
        from: config.nodemailer.user,
        to: email,
        subject: '[E-Commerce] Reset your password',
        html: `<h1>[E-Commerce] Reset your password</h1><hr />You have asked to reset your password.
                You can do it here: 
                <a href="http://${req.hostname}:${PORT}/reset-password/${token}">
                http://${req.hostname}:${PORT}/reset-password/${token}</a>
                <hr />Best regards,<br><strong>The Coder e-comm API team</strong>`
    }

    // envio del mail
    try {
        await transporter.sendMail(message)
        res.status(200).send({ status: 'success', message: `Email successfully sent to ${email} in order to reset password` })
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message })
    }
}

// verifica token para cambio de contraseña
export const verifyTokenSessionController = async (req, res) => {
    const token = req.params.token
    // consalta a db para verificar el token
    const userPassword = await UserPasswordService.getByToken(token);
    if (!userPassword) {
        return res.status(404).send({ status: 'error', error: 'Token no válido / El token ha expirado' })
    }
    const user = userPassword.email
    res.render('reset-password', { user })
}









export const resetPasswordSessionController = async (req, res) => {
    try {
        const user = await UsersService.get(req.params.user);
        
        await UsersService.update(user, req.body.newPassword);

        res.status(200).send({ status: 'success', message: 'Se ha creado una nueva contraseña' })
        await UserPasswordService.delete(req.params.user);
    } catch(err) {
        res.status(500).send({ status: 'error', error: err.message })
    }
}