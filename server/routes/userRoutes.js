import express from "express";
const router = express.Router();
import { RegisterUser , LoginUser , Logout , AddUser , GetUser , DeleteUser, UpdateUser , EditUser} from '../controller/userController.js'; 
import { AdminLogin , checkAdminAuth} from '../controller/AdminController.js'; 


router.post('/registerUser' , RegisterUser)
router.post('/loginUser' , LoginUser)
router.post('/logout', Logout);

router.post('/adduser' , AddUser)
router.get('/getUser' , GetUser)
router.delete('/deleteuser/:id' ,DeleteUser)
router.get('/updateuser/:id' ,UpdateUser)
router.post('/edituser' , EditUser)


router.post('/adminlogin', AdminLogin )
router.get('/checkAdminAuth' , checkAdminAuth)

export default router;
