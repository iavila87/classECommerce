import UsersDTO from "../dto/users.dto.js";
import { UsersService } from '../repositories/index.js'


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