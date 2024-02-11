import { Router } from "express";
import  {   getAllUsersController,
            deleteInactiveUsersController,
            modRoleUserController 
} from "../controllers/users.controller.js"


const router = Router();

router.get('/', getAllUsersController);

router.delete('/', deleteInactiveUsersController);

router.put('/:user/:role', modRoleUserController);

export default router