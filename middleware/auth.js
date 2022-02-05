const jwt = require("jsonwebtoken")
const User = require("../models/User")
const ErrorResponse = require("../utils/errorResponse")

exports.protect = async (req, res, next) => {
    let token 
    console.log(req.headers.authorization)
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]
    }
    console.log(token)

    if(!token){
        return next(new ErrorResponse("Siz hali ro'yxatdan o'tmagansiz!", 401))
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)

        const user = await User.findById(decoded.id);
        console.log(user)
        if(!user){
            return next(new ErrorResponse("Bunday foidalanuvchi ro'yxatdan o'tmagan!"))
        }
        
        req.user = user

        return next()
    }catch(err){
        return next(new ErrorResponse("Siz hali ro'yxatdan o'tmagansiz!.", 401))
    }
}