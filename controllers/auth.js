const User = require("../models/User")
const crypto = require("crypto")
const ErrorResponse = require("../utils/errorResponse")
const sendEmail = require("../utils/sendEmail")

exports.register = async (req, res, next) => {
    const { username, email, password, zipCode } = req.body;
    console.log(username) 
    try {
      const user = await User.create({username, email, password, zipCode});
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

        const resetUrl = `http://localhost:3000/resetpassword/${resetToken}`;

        const message = `
            <h1>Siz parolingizni yangilashingiz kerak!</h1>
            <p>Iltimos quyidagi havola tugmasini bosishingizni so'raymiz</p>
            <button  style="display: block;
                            width: 300px;
                            height: 50px;
                            margin: 15px 10px;
                            background-color: #3636ff;
                            color: white;
                            border-radius: 5px;
                            align-items: center;">
                <a   style="text-decoration: none; 
                            color: white;
                            display: inline-block;
                            width: 100%;
                            height: 100%;
                            padding-top: 13px;"  
                            href=${resetUrl} clicktracking=off>
                    Parolni Yangilash
                </a>
            </button>`;
        
        try{
            await sendEmail({
                to: user.email,
                subject: "Parolni yangilash xabarnomasi",
                text: message
            })

            res.status(200).json({success: true, msg: "Pochtangizga xabar yuborildi"})
        }catch(error){
            user.resetPasswordToken = undefined
            user.resetPasswordExpire = undefined
            await user.save()

            return next(new ErrorResponse("Elektron pochtangizga xat yuborishning iloji bo'lmadi.", 500))
        }

    }catch(error){
        next(error)
    }
}
exports.resetpassword = async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
    try{
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        })

        if(!user){
            return next(new ErrorResponse("Kechirasiz xatolik ro'y berdi", 400))
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
    
        await user.save();
        console.log(user)

        res.status(201).json({success: true, data: "Parolni yangilash muvaffaqiyatli bajarildi!"})
    }catch(err){
        next(err)
    }
}
exports.updateuser = async (req, res, next) => {
    const {username, email, oldpassword, newpassword, oldzipCode, newzipCode} = req.body
    const userID = req.params.userID
    try{
        const user = await User.findById(userID).select("+password")
        if(!user){
            return next(new ErrorResponse("Kechirasiz, bunaqa foidalanuchi topilmadi", 400))
        }
        const isMatch = await user.matchPassword(oldpassword);
        if(!isMatch){
            return next(new ErrorResponse("Noto'g'ri parol kirittingiz", 401))
        }
        if(oldzipCode !== user.zipCode){
            return next(new ErrorResponse("Noto'g'ri zipcode kirittingiz", 401))
        }

        if(newpassword){
            user.password = newpassword
        }
        if(newzipCode){
            user.zipCode = newzipCode
        }
        user.username = username
        user.email = email
    
        await user.save();
        console.log(user)

        res.status(201).json({success: true, data: "Parolni yangilash muvaffaqiyatli bajarildi!"})
    }catch(err){
        next(err)
    }
}
exports.getusers = async (req, res, next) => {
    try{
        const users = await User.find() 
        res.status(200).json({success: true, data: users})
    }catch(err){
        next(err)
    }
}

const sendToken = (user, statusCode, res) => {
    const token = user.getSignToken()
    console.log(user)
    res.status(statusCode).json({success: true, token, user: {...user._doc, password: null, zipCode: null}})
}