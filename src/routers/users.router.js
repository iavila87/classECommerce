import { Router } from "express";
import  {   getAllUsersController,
            deleteInactiveUsersController 
} from "../controllers/users.controller.js"


const router = Router();

router.get('/', getAllUsersController);

router.delete('/', deleteInactiveUsersController);

export default router