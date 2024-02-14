import asyncHandler from "express-async-handler";
import User from '../model/userModel.js'
import Admin from '../model/adminModel.js'
import bcrypt from 'bcryptjs';

import generateToken from '../utils/generateToken.js'


//ADMIN LOGIN FUNCTIONALITY LOGICS
const adminAuth = asyncHandler(async (req,res)=>{

        const {email,password} = req.body
        console.log(email);
        console.log(password);

        const admin = await Admin.findOne({email:email})
        console.log(admin);

        bcrypt.compare(password, admin.password).then(isMatch => {
            if(admin && isMatch){
                console.log('entered')
                generateToken(res,admin._id,'admin-jwt')
                res.status(201).json({
                    _id:admin._id,
                    email:admin.email
                })
            }else{
                res.status(401)
                throw new Error('Invalid Password or email')
            }
        })

})

const editUser = asyncHandler(async(req,res)=>{

})

const deleteUser = asyncHandler(async(req,res)=>{

})

const blockUser = asyncHandler(async(req,res)=>{
    res.status(200).json({ message: "block user" });

})

const getUsers = asyncHandler(async(req,res)=>{
    res.status(200).json({ message: "user getting" });

})

const adminLogout = asyncHandler(async(req,res)=>{
    res.status(200).json({ message: "Admin Logged Out" });
})



export {
    adminAuth,
    editUser,
    deleteUser,
    blockUser,
    getUsers,
    adminLogout
}
