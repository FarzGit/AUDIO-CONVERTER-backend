import express from 'express'

import {adminAuth,editUser,deleteUser,blockUser,getUsers,adminLogout} from '../controller/adminController.js'

const Router = express.Router()

Router.post('/auth',adminAuth)
Router.post('/logout',adminLogout)







export default Router