import UsersDTO from "../dto/users.dto.js";
import { UsersService } from '../repositories/index.js'
import nodemailer from 'nodemailer'
import config from '../config/config.js';

export const modRoleUserController = async (req, res) => {
    const email = req.params.user;
    const role = req.params.role;
    const user = await UsersService.updateRole(email,role);
    
    return res.status(200).send( { 
        status:'success',
        payload: user
    } );
}

export const getAllUsersController = async (req, res) => {
    
    try{
        const users = await UsersService.getAll();
        let allUsersDTO = [];
        for (let index = 0; index < users.length; index++) {
            allUsersDTO.push(new UsersDTO(users[index]));
        }

        return res.status(200).send( { 
            status:'success',
            payload: allUsersDTO
        } );
    }
    catch(error){
        logger.error(error);
        return res.status(500).send( { status: "error", error: error.message } );
    }
}

// limpia todos los usuarios inactivos por cierto tiempo
export const deleteInactiveUsersController = async (req, res) => {
    try{
        const day_as_milliseconds = 86400000;
        const users = await UsersService.getAll();
        
        for (let index = 0; index < users.length; index++) {
            
            const diff = Date.now() - users[index].last_connection.getTime();
            const diffDays = diff / day_as_milliseconds;
            
            if( diffDays > 2 ){
                
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
                    to: users[index].email,
                    subject: '[E-Commerce] Delete your account',
                    html: `<h1>[E-Commerce] Delete your account</h1><hr />
                            <hr />Best regards,<br><strong>The Coder e-comm API team</strong>`
                }
                // envio del mail
                try {
                    await transporter.sendMail(message)
                    //res.status(200).send({ status: 'success', message: `Email successfully sent to ${users[index].email} in order to reset password` })
                } catch (error) {
                    res.status(500).send({ status: 'error', error: error.message })
                }
                try {
                    await UsersService.delete(users[index]._id);
                    //res.status(200).send({ status: 'success', message: `Delete ${users[index].email} ` })
                } catch (error) {
                    res.status(500).send({ status: 'error', error: error.message })
                }

            }
        }

        return res.status(200).send( { 
            status:'success',
            payload: users
        } );
    }
    catch(error){
        //logger.error(error);
        return res.status(500).send( { status: "error", error: error.message } );
    }
}