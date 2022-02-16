const mongoose = require("mongoose")

const ClientTypeSchema = new mongoose.Schema({
    sellerID: {
        type: String,
        required: [true, "Xatolik! Sotuvchining ID malumotlari mavjud emas"],
    },
    clientType: {
        type: String,
        required: [true, "Xatolik! Sotuvchining ID malumotlari mavjud emas"],
    },
    clientQuality: {
        type: Number,
        default: 0,
    },
})

const ClientType = mongoose.model("ClientType", ClientTypeSchema)

module.exports = ClientType