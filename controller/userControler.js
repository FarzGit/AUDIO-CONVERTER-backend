import asyncHandler from 'express-async-handler'
import User from '../model/userModel.js'
import genereateToken from '../utils/generateToken.js'
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs'

const userAuth = asyncHandler(async (req, res) => {
  console.log('entered')

  const { email, password } = req.body

  const user = await User.findOne({ email: email })
 

  if (user && (await user.matchPassword(password))) {
    genereateToken(res, user._id)
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      mobile:user.mobile,
      isStatus:user.isStatus
    })
  } else {
    res.status(401)
    throw new Error('Invalid Password or email')
  }
})

// USER REGISTRATIOIN FUNCTION HANDLE

const register = asyncHandler(async (req, res) => {
  const { name, email, mobile, password } = req.body
  console.log('entered to register')
  console.log(name)



  const userExist = await User.findOne({ email: email })

  if (userExist) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    mobile,
    password
  })

  console.log(user)

  console.log('user is :', user)

  if (user) {
    genereateToken(res, user._id)
    res.status(201).json({
      _id: user.id,
      name: user.name,
      mobile: user.mobile,
      email: user.email
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// USER USER FUNCTION HANDLE

const logOut = asyncHandler((req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  })

  res.status(200).json({ message: 'user logged out' })
})

// USER PROFILE FUNCTION HANDLE

const getProfile = asyncHandler((req, res) => {
  console.log(req.user)

  const user = {
    _id: req.user._id,
    name: req.user.name,
    mobile: req.user.mobile,
    email: req.user.email
  }

  res.status(200).json(user)
})

// USER EDIT PROFILE FUNCTION HANDLE

const editProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.mobile = req.body.mobile || user.mobile

    if(req.body.oldPassword){
      const isPasswordMatch = await user.matchPassword(req.body.oldPassword);
      if(!isPasswordMatch){
        return res.status(401).json({message:'Old password is incorrect'})
      }
    }

    if (req.body.password) {
      user.password = req.body.password
    }
  }

  let updated = await user.save()

  res.status(201).json({
    _id: updated._id,
    name: updated.name,
    email: updated.email,
    mobile: updated.mobile
  })
})


const uploadProfileImage = asyncHandler(async(req,res)=>{

  console.log('entered upload image')
  
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }


  try {
    const user = await User.findById(req.user._id);

    console.log(user)

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.profile = req.file.filename;
    const updatedData= await user.save();

    res.status(200).json({ 
      _id:updatedData._id,
        name:updatedData.name,
        email:updatedData.email,
        mobile:updatedData.mobile,
        isStatus:updatedData.isBlocked,
        profile:updatedData.profile 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }


})

export { userAuth, register, logOut, getProfile, editProfile,uploadProfileImage }
