const mongoose = require("mongoose")

const ConvertSchema = new mongoose.Schema({
    sellerID: {
        type: String,
        required: [true, "Xatolik! Sotuvchining ID malumotlari mavjud emas."],
    },
    clientID: {
        type: String,
        required: [true, "Xatolik! Client ID malumotlari mavjud emas."],
    },
    convertType:{
        type: String,
        required: [true, "Xatolik! Maxsulot turi berilmagan."],
    },
    sales:{
        productName: String,
        productType: String,   
        price: Number,
        quality: Number,
    },
    payment:{
       quality: Number,
    }, 
    createAt: {
        type: Date,
        default: new Date(),
    },
    updateAt:{
        type: Date,
        default: new Date(),
    },
})


const Convert = mongoose.model("Convert", ConvertSchema)

module.exports = Convert