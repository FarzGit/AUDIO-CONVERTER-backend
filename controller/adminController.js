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
    
    const user = await User.findById(req.body._id)

    if(user){
        user.name = req.body.name || user.name
        user.mobile = req.body.mobile || user.mobile
        user.email = req.body.email || user.email
    }

    const updateUser = await user.save()

    res.status(201).json({
        _id:updateUser._id,
        name:updateUser.name,
        email:updateUser.email,
        mobile:updateUser.mobile
    })

})

const deleteUser = asyncHandler(async(req,res)=>{

})

const blockUser = asyncHandler(async(req,res)=>{
    const userId = req.query.id
    const user = await User.findOne({_id:userId}).select('-password')
    if(user){
        user.isStatus = !user.isStatus;
        await user.save()
    }
    res.status(200).json(user);

})

const getUsers = asyncHandler(async(req,res)=>{
    console.log('entered into getuser')
    const user = await User.find().select('-password')
    console.log('user:',user)
    res.json({user})
})

const adminLogout = asyncHandler(async(req,res)=>{

    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
      })
    
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
