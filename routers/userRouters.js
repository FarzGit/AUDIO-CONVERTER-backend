import express from 'express'
import { userAuth,register,logOut,getProfile,editProfile,uploadProfileImage } from '../controller/userControler.js'
import {protect} from '../middleware/authMiddleware.js'
import { upload } from '../../backend/middleware/imageUpload.js';

const router = express.Router()

router.post('/auth',userAuth)
router.post('/',register)
router.post('/logout',logOut)
router.get('/profile',protect,getProfile)
router.put('/editProfile',protect,editProfile)
router.put('/profile-image', protect, upload.single('profile-image'), uploadProfileImage);


export default router