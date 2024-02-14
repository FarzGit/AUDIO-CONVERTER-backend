import express from 'express'
import { userAuth,register,logOut,getProfile,editProfile } from '../controller/userControler.js'
import {protect} from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/auth',userAuth)
router.post('/',register)
router.post('/logout',logOut)
router.get('/profile',protect,getProfile)
router.put('/editProfile',protect,editProfile)


export default router