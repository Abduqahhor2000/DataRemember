const User = require("../models/User")
const Client = require("../models/Client")
const Convert = require("../models/Convert")
const ClientType = require("../models/ClientType")
const ErrorResponse = require("../utils/errorResponse")

exports.stat_client = async (req, res, next) => {
    const {clientID} = req.body

    try{
        const converts = await Convert.find({clientID})
        let payment = 0
        let sales = 0
        converts.map(item => {
            if(item.convertType === "sales"){
                sales += ((item.sales.price || 0) * (item.sales.quality || 0)) || 0
            }else{
                payment += item.payment.quality || 0
            }
        })
        
        res.status(201).json({success: true, data: { sales, payment }})
    }catch(err){
        next(err)
    }
}