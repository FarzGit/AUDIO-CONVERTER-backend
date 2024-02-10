
import asyncHandler from 'express-async-handler'

const userAuth = asyncHandler((req,res)=>{

        res.status(200).json({message:"userAuth"})
});

export {
    userAuth
}