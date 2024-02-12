import express from 'express'
import { userAuth,register,logOut,getProfile,editProfile } from '../controller/userControler.js'

const router = express.Router()

router.post('/',userAuth)
router.post('/register',register)
router.post('/logout',logOut)
router.get('/profile',getProfile)
router.put('/editProfile',editProfile)


export default router