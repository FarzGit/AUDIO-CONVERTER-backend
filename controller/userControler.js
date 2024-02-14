import asyncHandler from 'express-async-handler'
import User from '../model/userModel.js'
import genereateToken from '../utils/generateToken.js'

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
      mobile:user.mobile
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

export { userAuth, register, logOut, getProfile, editProfile }
