const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    sellerID: {
        type: String,
        required: [true, "Xatolik! Sotuvchining ID malumotlari mavjud emas."],
    },
    clientID: {
        type: String,
        required: [true, "Xatolik! Client ID malumotlari mavjud emas."],
    },
    productName:{
        type: String,
        required: [true, "Xatolik! Maxsulot turi berilmagan."],
    },
    productType: {
        type: String,
        required: [true, "Xatolik! Maxsulot navi mavjud emas."],
    },
    price:{
        type: Number,
        required: [true, "Xatolik! Maxsulot narxi berilmagan"],
    },
    quality:{
        type: Number,
        default: "Mijoz haqida qisqacha malumotlar...",
    },
})
const PaymentSchema = new mongoose.Schema({
    sellerID: {
        type: String,
        required: [true, "Xatolik! Sotuvchining ID malumotlari mavjud emas."],
    },
    clientID: {
        type: String,
        required: [true, "Xatolik! Client ID malumotlari mavjud emas."],
    },
    productName:{
        type: String,
        required: [true, "Xatolik! Maxsulot turi berilmagan."],
    },
    productType: {
        type: String,
        required: [true, "Xatolik! Maxsulot navi mavjud emas."],
    },
    price:{
        type: Number,
        required: [true, "Xatolik! Maxsulot narxi berilmagan"],
    },
    quality:{
        type: Number,
        default: "Mijoz haqida qisqacha malumotlar...",
    },
})

const Client = mongoose.model("Client", ClientSchema)

module.exports = Client