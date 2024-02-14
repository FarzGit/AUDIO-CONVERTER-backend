import express from 'express'

import {adminAuth,editUser,deleteUser,blockUser,getUsers,adminLogout} from '../controller/adminController.js'
import { protect } from '../middleware/adminAuthMiddleware.js'

const Router = express.Router()

Router.post('/auth',adminAuth)
Router.post('/logout',adminLogout)
Router.get('/users',protect,getUsers)
Router.put('/users/edit-user',editUser)
Router.patch('/users/block-unblock',protect,blockUser)








export default Router