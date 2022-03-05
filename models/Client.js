const mongoose = require("mongoose")

const ClientSchema = new mongoose.Schema({
    sellerID: {
        type: String,
        required: [true, "Xatolik! Sotuvchining ID malumotlari mavjud emas"],
    },
    clientType:{
        type: String,
        required: [true, "Xatolik! Mijozning maqomi mavjut emas"],
    },
    fullName: {
        type: String,
        required: [true, "Iltimos mijoz nomini kiriting!"],
    },
    phoneNumber:{
        type: String,
        default: "undefined"   
    },
    bio: {
        type: String,
        default: "Mijoz haqida qisqacha malumotlar...",
    },
    createAt: {
        type: Date,
        default: new Date(),
    },
    updateAt: {
        type: Date,
        default: new Date(),
    },
})

const Client = mongoose.model("Client", ClientSchema)

module.exports = Client