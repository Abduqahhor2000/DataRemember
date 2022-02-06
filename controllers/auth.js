const User = require("../models/User")
const ErrorResponse = require("../utils/errorResponse")
const sendEmail = require("../utils/sendEmail")

exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;
  
    try {
      const user = await User.create({username, email, password});
        sendToken(user, 200, res)
    } 
    catch(err){
        next(err)
    }
}
exports.login = async (req, res, next) => {
    const {email, password} = req.body
    
    if(!email || !password){
        return next(new ErrorResponse("Kechirasiz, email yoki password ni to'ldirmadingiz!", 400))
    }
    
    try{
        const user = await User.findOne({email}).select("+password")
        if(!user){
            return next(new ErrorResponse("Noto'g'ri malumot kirittingiz", 401))
        }
        
        const isMatch = await user.matchPassword(password);
        if(!isMatch){
            return next(new ErrorResponse("Noto'g'ri malumot kirittingiz", 401))
        }
        
        sendToken(user, 200, res)
    }catch(err){
        next(err)     
    }
}
exports.forgotpassword = async (req, res, next) => {
    const {email} = req.body

    try{
        const user = await User.findOne({email})
        if(!user){
            return next(new ErrorResponse("Noto'g'ri email kirittingiz!", 404))
        }

        const resetToken = user.getResetPasswordToken()
        await user.save()
        // console.log(email)

        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

        const message = `
        <h1>You have requested a password reset</h1>
        <p>Please make a put request to the following link:</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>`;
        try{
            await sendEmail({
                to: user.email,
                subject: "Password Reset Request",
                text: message
            })

            res.status(200).json({success: true, msg: "Email send"})
        }catch(error){
            user.resetPasswordToken = undefined
            user.resetPasswordExpire = undefined
            await user.save()

            return next(new ErrorResponse("Email could not be send", 500))
        }

    }catch(error){
        console.log("fkdsfhsk")
        next(error)
    }
}
exports.resetpassword = async (req, res, next) => {
    
}

const sendToken = (user, statusCode, res) => {
    const token = user.getSignToken()
    res.status(statusCode).json({success: true, token, user})
}