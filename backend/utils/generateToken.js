import jwt from "jsonwebtoken"

const generateToken = (res,userId) => {
    const token = jwt.sign({userId},"mySecretKey",{
        expiresIn:"30d"
    })

    res.cookie('jwt',token,{
        httpOnly:true,
        secure:false,
        sameSite:'strict',
        maxAge: 30*24*60*60*1000
    })
    
}

export default generateToken;