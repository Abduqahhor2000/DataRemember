const User = require("../models/User")
const ClientType = require("../models/ClientType")
const ErrorResponse = require("../utils/errorResponse")

exports.addclient_type = async (req, res, next) => {
    const {clientType, sellerID, zipCode} = req.body

    try{
        const user = await User.findById(sellerID)
        if(!user){
            return next(new ErrorResponse("Kechirasiz, bunaqa foidalanuvchi topilmadi", 400))
        }
        if(zipCode !== user.zipCode){
            return next(new ErrorResponse("Noto'g'ri zipcode kirittingiz", 401))
        }

        const client_type = await ClientType.create({clientType, sellerID})
        res.status(201).json({success: true, data: "Parolni yangilash muvaffaqiyatli bajarildi!"})
    }catch(err){
        next(err)
    }
}
exports.getclient_types = async (req, res, next) => {
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
exports.updateclient_type = async (req, res, next) => {
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
exports.deleteclient_type = async (req, res, next) => {
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