import express from 'express'
import { userAuth } from '../controller/userControler.js'

const router = express.Router()

router.post('/auth',userAuth)


export default router