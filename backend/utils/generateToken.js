import jwt from 'jsonwebtoken'

const genereateToken = (res,userId)=>{

    const token = jwt.sign({userId},process.env.SECRET_KEY,{expiresIn:'30d'})

    res.cookie('jwt',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV !== 'development',
        sameSite:'strict'
    })
}


export default genereateToken