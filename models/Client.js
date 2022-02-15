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
        required: [true, "Iltimos mijoz telefon raqamani kiriting!"],
    },
    bio: {
        type: String,
        default: "Mijoz haqida qisqacha malumotlar...",
    },
})

const Client = mongoose.model("Client", ClientSchema)

module.exports = Client