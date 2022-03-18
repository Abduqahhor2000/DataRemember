const Client = require("../models/Client")
const User = require("../models/User")
const ClientType = require("../models/ClientType")
const ErrorResponse = require("../utils/errorResponse")

exports.addclient = async function (req, res, next) {
    const {sellerID, zipCode, clientType, fullName, phoneNumber, bio} = req.body

    try{
        const user = await User.findById(sellerID)

        
        if(!(user.zipCode === zipCode)){
            return next( new ErrorResponse("Zip Code noto'g'ri!"))
        }
        
        try{
            if(clientType === "standard"){
                const client = await Client.create({ sellerID, clientType, fullName, phoneNumber, bio })
                res.status(201).json({success: true, data: client})
                return;
            }

            const client_type = await ClientType.findOne({clientType, sellerID})
            if(!client_type){
                return next( new ErrorResponse("Bunday mijoz turi mavjut emas!"))
            }
            const client = await Client.create({ sellerID, clientType, fullName, phoneNumber, bio })
            client_type.quality += 1 
            await client_type.save()
            res.status(201).json({success: true, data: client})
        }catch(err){
            next(err)
        }
    }catch(err){
        next(new ErrorResponse("Noto'g'ri ID yuborildi!"))
    }
}
exports.deleteclient = async function (req, res, next) {
    const {sellerID, zipCode, clientType} = req.body
    const clientID = req.params.clientID
    try{
        const user = await User.findById(sellerID)
        if(!(user.zipCode === zipCode)){
            return next( new ErrorResponse("Zip Code noto'g'ri!"))
        }  
        
        try{
            const client = await Client.findByIdAndDelete(clientID)
            if(!client){
                return next( new ErrorResponse("Bu id bo'yicha malumot mavjut emas!"))
            }
            if(clientType !== "standard"){
                const client_type = await ClientType.findOne({clientType, sellerID})
                client_type.quality -= 1 
                await client_type.save()
            }
           
            res.status(202).json({success: true})
        }catch(err){
            next(err)
        }
    }catch(err){
        next( new ErrorResponse("Sotuvchi ID si noto'g'ri yuborilgan!"))
    }
}
exports.getclients = async function (req, res, next) {
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
exports.updateclient = async function (req, res, next) {
    const {sellerID, zipCode, clientType, fullName, phoneNumber, bio} = req.body
    const clientID = req.params.clientID

    try{
        const user = await User.findById(sellerID)
        if(!(user.zipCode === zipCode)){
            return next( new ErrorResponse("Zip Code noto'g'ri!"))
        }
        if(clientType !== "standard"){
            const clientTypes = await ClientType.find({sellerID})
            const clientTypes2 = clientTypes.find(function (item) {
                return clientType === item.clientType
            })
            if(!clientTypes2){
                return next( new ErrorResponse("Mijozning Bunday turini avval kiritmagansiz. oldin kiriting!"))
            }
        }

        try{
            const client = await Client.findByIdAndUpdate(clientID, 
                {   
                    clientType,
                    fullName,
                    phoneNumber, 
                    bio,
                });
            if(clientType !== client.clientType){
                if(client.clientType !== "standard"){
                    const client_type = await ClientType.findOne({clientType: client.clientType, sellerID})
                    client_type.quality -= 1 
                    await client_type.save()   
                }
                if(clientType !== "standard"){
                    const client_type2 = await ClientType.findOne({clientType, sellerID})  
                    client_type2.quality += 1 
                    await client_type2.save()
                }
            }

            res.status(201).json({success: true, data: await Client.findById(clientID)})
        }catch(err){
            next(err)
        }
    }catch(err){
        next( new ErrorResponse("Sotuvchi ID si noto'g'ri yuborilgan!"))
    }
}

