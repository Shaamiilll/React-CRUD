import express from "express";
const router = express.Router();
import { RegisterUser , LoginUser} from '../controller/userController.js'; 


router.post('/registerUser' , RegisterUser)
router.post('/loginUser' , LoginUser)

export default router;
