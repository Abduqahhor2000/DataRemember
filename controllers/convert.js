const Client = require("../models/Client")
const User = require("../models/User")
const Convert = require("../models/Convert")
const ErrorResponse = require("../utils/errorResponse")

exports.addconvert = async function (req, res, next) {
    const {sellerID, clientID, zipCode, convertType, productName, productType, price, quality} = req.body

    try{
        const user = await User.findById(sellerID)
        const client = await Client.findById(clientID)
        
        if(!(client.sellerID === sellerID)){
            return next( new ErrorResponse("Sotuvchi va mijoz o'rtasida bo'liqlik topilmadi!"))
        }
        if(!(user.zipCode === zipCode)){
            return next( new ErrorResponse("Zip Code noto'g'ri!"))
        }

        try{
            if(convertType === "sales"){
                const convert = await Convert.create({
                    sellerID, 
                    clientID,
                    convertType, 
                    sales: {
                        productName, 
                        productType, 
                        price, 
                        quality, 
                    },
                    createAt: new Date(),
                })
                res.status(201).json({success: true, data: convert})
            }
            else if(convertType === "payment"){
                const convert = await Convert.create({ 
                    sellerID, 
                    clientID,
                    convertType, 
                    payment: {
                        quality, 
                    },
                    createAt: new Date(),
                })
                res.status(201).json({success: true, data: convert})
            }
            else{
                return next( new ErrorResponse("Almashinuv turi berilmagan!"))
            }
        }catch(err){
            return next(err)
        }  
    }catch(err){
        next(new ErrorResponse("Sotuvchi yoki xaridorning IDsi noto'g'ri!"))
    }
}
exports.updateconvert = async function (req, res, next) {
    const {sellerID, clientID, zipCode, convertType, productName, productType, price, quality} = req.body
    const convertID = req.params.convertID

    try{
        const user = await User.findById(sellerID)
        if(!(user.zipCode === zipCode)){
            return next( new ErrorResponse("Zip Code noto'g'ri!"))
        }
        const client = await Client.findById(clientID)
        if(!(client.sellerID === sellerID)){
            return next( new ErrorResponse("Sotuvchi va mijoz o'rtasida bo'liqlik topilmadi!"))
        }
        const convert = await Convert.findById(convertID)
        if(convert.convertType !== convertType){
            return next( new ErrorResponse("Xatolik! Almashinuv turini o'zgartirib bo'lmaydi."))
        }
        console.log(user, client, convert)

        try{
            if(convertType === "sales"){
                convert.sales = {
                        productName, 
                        productType, 
                        price, 
                        quality, 
                    };
                convert.updateAt = new Date();
                await convert.save()
                res.status(201).json({success: true})
            }
            else if(convertType === "payment"){
                convert.payment = {
                        quality, 
                    };
                convert.updateAt = new Date();
                await convert.save()
                res.status(201).json({success: true})
            }
            else{
                return next( new ErrorResponse("Almashinuv turi berilmagan!"))
            }
        }catch(err){
            return next(err)
        }  
    }catch(err){
        next(new ErrorResponse("Sotuvchi yoki xaridorning IDsi noto'g'ri!"))
    }
}
exports.getconverts = async function (req, res, next) {
    const {sellerID, clientID} = req.body    
    try{
        const client = await Client.findById(clientID)    
        if(client.sellerID !== sellerID){
            return next( new ErrorResponse("Sotuvchi va mijoz o'rtasida bo'liqlik topilmadi!"))
        }

        try{
            const converts = await Convert.find({ clientID, sellerID })    
            res.status(200).json({success: true, data: converts})
        }catch(err){
            next(err)    
        }
    }catch(err){
        next( new ErrorResponse("Sotuvchi yoki xaridor IDsi noto'g'ri yuborilgan!"))    
    }
}
exports.deleteconvert = async function (req, res, next) {
    const {sellerID, clientID, zipCode} = req.body    
    const convertID = req.params.convertID
    try{
        const user = await User.findById(sellerID)    
        if(!(user.zipCode === zipCode)){
            return next( new ErrorResponse("Zip Code noto'g'ri!"))    
        }  
        const client = await Client.findById(clientID)
        if(!(client.sellerID === sellerID)){
            return next( new ErrorResponse("Sotuvchi va mijoz o'rtasida bo'liqlik topilmadi!"))
        }

        try{
            await Convert.findByIdAndDelete(convertID)    
            res.status(202).json({success: true})
        }catch(err){
            next(err)    
        }
    }catch(err){
        next( new ErrorResponse("Sotuvchi ID si noto'g'ri yuborilgan!"))    
    }
}

