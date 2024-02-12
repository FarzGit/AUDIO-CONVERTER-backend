
import asyncHandler from 'express-async-handler'
import User from '../model/userModel.js';

const userAuth = asyncHandler((req,res)=>{

        res.status(200).json({message:"user Auth"})
});

// USER REGISTRATIOIN FUNCTION HANDLE 

const register = asyncHandler(async (req, res) => {
    const { name, email, mobile, password } = req.body;

    const userExist = await User.findOne({ email: email });

    if (userExist) {
        res.status(400);
        throw new Error("User already exists");
    }



    const user = await User.create({
        name,
        email,
        mobile,
        password
    });

    console.log('user is :', user);

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            mobile: user.mobile,
            email: user.email
        });
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
});


// USER USER FUNCTION HANDLE 


const logOut = asyncHandler((req,res)=>{
    res.status(200).json({message:'logOut the user'})
})     

// USER PROFILE FUNCTION HANDLE 

const getProfile = asyncHandler((req,res)=>{
    res.status(200).json({message:'User profile opened'})
})

// USER EDIT PROFILE FUNCTION HANDLE 


const editProfile = asyncHandler((req,res)=>{
    res.status(200).json({message:'user edit profile'})
})

export {
    userAuth,
    register,
    logOut,
    getProfile,
    editProfile
}