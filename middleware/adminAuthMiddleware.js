import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Admin from '../model/adminModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // console.log('admin protect');
  token = req.cookies.jwt;

  if (token) {
    try {
      // console.log('inside the try');
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = await Admin.findById(decoded.userId).select('-password');
      // console.log('before next:',req.user);
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized,no token');
    }
  }else{
    console.log('No token');
  }
});

export { protect }