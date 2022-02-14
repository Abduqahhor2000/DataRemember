const Client = require("../models/Client")
const User = require("../models/User")
const ErrorResponse = require("../utils/errorResponse")

exports.addclient = async function (req, res, next) {
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
// exports.deleteclient = async function (req, res, next) {
//     const {sellerID, zipCode, clientType, fullName, phoneNumber, bio} = req.body
    
//     const user = await User.findById(sellerID)
//     if(!user){
//         return next( new ErrorResponse("Sotuvchi ID si noto'g'ri yuborilgan!"))
//     }
//     if(!(user.zipCode === zipCode)){
//         return next( new ErrorResponse("Zip Code noto'g'ri!"))
//     }

//     try{
//         const client = await new Client.create({ sellerID, clientType, fullName, phoneNumber, bio })
//         res.status(201).json({success: true, data: client})
//     }catch(err){
//         next(err)
//     }
// }
// exports.getclients = async function (req, res, next) {
//     const {sellerID, zipCode, clientType, fullName, phoneNumber, bio} = req.body
    
//     const user = await User.findById(sellerID)
//     if(!user){
//         return next( new ErrorResponse("Sotuvchi ID si noto'g'ri yuborilgan!"))
//     }
//     if(!(user.zipCode === zipCode)){
//         return next( new ErrorResponse("Zip Code noto'g'ri!"))
//     }

//     try{
//         const client = await new Client.create({ sellerID, clientType, fullName, phoneNumber, bio })
//         res.status(201).json({success: true, data: client})
//     }catch(err){
//         next(err)
//     }
// }
// exports.updateclient = async function (req, res, next) {
//     const {sellerID, zipCode, clientType, fullName, phoneNumber, bio} = req.body
    
//     const user = await User.findById(sellerID)
//     if(!user){
//         return next( new ErrorResponse("Sotuvchi ID si noto'g'ri yuborilgan!"))
//     }
//     if(!(user.zipCode === zipCode)){
//         return next( new ErrorResponse("Zip Code noto'g'ri!"))
//     }

//     try{
//         const client = await new Client.create({ sellerID, clientType, fullName, phoneNumber, bio })
//         res.status(201).json({success: true, data: client})
//     }catch(err){
//         next(err)
//     }
// }

