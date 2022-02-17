const mongoose = require("mongoose")

const ClientTypeSchema = new mongoose.Schema({
    sellerID: {
        type: String,
        required: [true, "Sotuvchi IDsi mavjut emas!"]
    },
    clientType: {
        type: String,
        required: true
    },
    quality: {
        type: Number,
        default: 0,
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


const ClientType = mongoose.model("ClientType", ClientTypeSchema)

module.exports = ClientType