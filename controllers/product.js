const User = require("../models/User")
const Client = require("../models/Client")
const Convert = require("../models/Convert")
const ClientType = require("../models/ClientType")
const ErrorResponse = require("../utils/errorResponse")
const Product = require("../models/Product")

exports.add_product = async (req, res, next) => {
    const {sellerID, productName, zipCode} = req.body

    try{
        const user = await User.findById(sellerID)
        if (!user){
            return next( new ErrorResponse("Bunday foidalanuvchi mavjut emas!"))
        }
        if( user.zipCode !== zipCode){
            return next( new ErrorResponse("ZipCode noto'g'ri!"))
        }

        const product = await Product.create({sellerID, productName})
   
        res.status(201).json({success: true, data: product})
    }catch(err){
        next(err)
    }
}