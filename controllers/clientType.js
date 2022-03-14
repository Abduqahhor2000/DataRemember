const User = require("../models/User")
const Client = require("../models/Client")
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
        const client_types = await ClientType.find({sellerID})
        const doubleTypes = client_types.find(elem => {
            if(elem.clientType === clientType){
                return true
            }
            return false
        });
        if(doubleTypes){
            return next(new ErrorResponse("Kechirasiz, Bunday nomda avval qo'shgansiz", 400))
        }

        await ClientType.create({clientType, sellerID})
        res.status(201).json({success: true, data: "Parolni yangilash muvaffaqiyatli bajarildi!"})
    }catch(err){
        next(err)
    }
}
exports.getclient_types = async (req, res, next) => {
    const {sellerID} = req.body

    try{
        const user = await User.findById(sellerID)
        if(!user){
            return next(new ErrorResponse("Kechirasiz, bunaqa foidalanuchi topilmadi", 400))
        }
        
        try{
            const client_types = await ClientType.find({sellerID})
            res.status(200).json({success: true, data: client_types})
        }catch(err){
            return next(err)
        }
    }catch(err){
        next(new ErrorResponse("Mavjut bo'lmagan foydalanuvchi!"))
    }
}
exports.updateclient_type = async (req, res, next) => {
    const {sellerID, clientType, zipCode} = req.body
    const clientTypeID = req.params.typeID
    try{
        const user = await User.findById(sellerID)
        if(!user){
            return next(new ErrorResponse("Kechirasiz, bunaqa foidalanuchi topilmadi", 400))
        }
        if(zipCode !== user.zipCode){
            return next(new ErrorResponse("Noto'g'ri zipcode kirittingiz", 401))
        }
        
        try{
            const client_type = await ClientType.findByIdAndUpdate(clientTypeID, {
                clientType,
                updateAt: new Date()
            })
            const clients = await Client.updateMany({sellerID, clientType: client_type.clientType}, {clientType})
            res.status(201).json({success: true, data: client_type})
        }catch(err){
            return next(new ErrorResponse("Malumotni yangilashda xatolikka yo'l qoyildi!", 401)) 
        }

    }catch(err){
        next(err)
    }
}
exports.deleteclient_type = async (req, res, next) => {
    const {sellerID, zipCode} = req.body
    const typeID = req.params.typeID
    try{
        const user = await User.findById(sellerID)
        if(!user){
            return next(new ErrorResponse("Kechirasiz, bunaqa foidalanuchi topilmadi", 400))
        }
        if(zipCode !== user.zipCode){
            return next(new ErrorResponse("Noto'g'ri zipcode kirittingiz", 401))
        }

        try{
            const client_type = await ClientType.findByIdAndDelete(typeID)
            const clients = await Client.updateMany({sellerID, clientType: client_type.clientType}, {clientType: "standard"})
            
            res.status(201).json({success: true, data: clients})
        }catch(err){
            return next(err)
        }
    }catch(err){
        next(err)
    }
}