const Client = require("../models/Client")
const User = require("../models/User")
const History = require("../models/")
const ErrorResponse = require("../utils/errorResponse")

exports.addhistory = async function (req, res, next) {
    const {sellerID, zipCode, clientType, fullName, phoneNumber, bio} = req.body

    try{
        const user = await User.findById(sellerID)

        
        if(!(user.zipCode === zipCode)){
            return next( new ErrorResponse("Zip Code noto'g'ri!"))
        }
        
        try{
            const client = await Client.create({ sellerID, clientType, fullName, phoneNumber, bio })
            res.status(201).json({success: true, data: client})
        }catch(err){
            next(err)
        }
    }catch(err){
        next(new ErrorResponse("Noto'g'ri ID yuborildi!"))
    }
}
exports.deletehistory = async function (req, res, next) {
    const {sellerID, zipCode} = req.body
    const clientID = req.params.clientID
    try{
        const user = await User.findById(sellerID)
        if(!(user.zipCode === zipCode)){
            return next( new ErrorResponse("Zip Code noto'g'ri!"))
        }  

        try{
            await Client.findByIdAndDelete(clientID)
            res.status(202).json({success: true})
        }catch(err){
            next(err)
        }
    }catch(err){
        next( new ErrorResponse("Sotuvchi ID si noto'g'ri yuborilgan!"))
    }
}
exports.gethistorys = async function (req, res, next) {
    const {sellerID, clientType} = req.body
    try{
        const user = await User.findById(sellerID)
    
        try{
            const clients = await Client.find({ sellerID, clientType })
            res.status(200).json({success: true, data: clients})
        }catch(err){
            next(err)
        }
    }catch(err){
        next( new ErrorResponse("Sotuvchi ID si noto'g'ri yuborilgan!"))
    }
}
exports.updatehistory = async function (req, res, next) {
    const {sellerID, zipCode, clientType, fullName, phoneNumber, bio} = req.body
    const clientID = req.params.clientID

    try{
        const user = await User.findById(sellerID)
        if(!(user.zipCode === zipCode)){
            return next( new ErrorResponse("Zip Code noto'g'ri!"))
        }  

        try{
            const client = await Client.findByIdAndUpdate(clientID, 
                {   
                    clientType,
                    fullName,
                    phoneNumber, 
                    bio,
                });

            res.status(201).json({success: true, data: await Client.findById(clientID)})
        }catch(err){
            next(err)
        }
    }catch(err){
        next( new ErrorResponse("Sotuvchi ID si noto'g'ri yuborilgan!"))
    }
}

