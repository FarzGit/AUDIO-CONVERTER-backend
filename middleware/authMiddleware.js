import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../model/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  let token

  token = req.cookies.jwt

  if (token) {
    try {
      const decode = jwt.verify(token, process.env.SECRET_KEY)

      req.user = await User.findById(decode.userId).select('-password')

      next()
    } catch (error) {
        res.status(401)
      throw new Error('invalid token , no token')
    }
  } else {
    res.status(401)
    throw new Error('unAuthourized token')
  }
})

export { protect }
